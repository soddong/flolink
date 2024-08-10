import { useState } from 'react';
import { startPlantWalk, getStartWalkLocation, endPlantWalk } from '../../service/plant/plantApi';
import useGeolocation from './geoHook';

const usePlantHook = (status, setStatus, userRoomId, setSuccessMessage, setShowMessage, setErrorMessage, setShowError, setShowLocationModal) => {
  const [startLocation, setStartLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const { location, error, loading, getLocation } = useGeolocation();

  const handleStartWalk = async () => {
    if (loading) return;

    try {
      const newLocation = location || await new Promise(resolve => getLocation(resolve));
      if (status.plantId && newLocation && userRoomId) {
        await startPlantWalk(status.plantId, newLocation, userRoomId);
        setSuccessMessage("산책을 시작합니다!");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        setStatus(prevStatus => ({ ...prevStatus, walker: userRoomId }));
      } else {
        console.error("식물 ID 또는 위치 정보가 없습니다.");
      }
    } catch (error) {
      console.error('산책 시작에 실패했습니다:', error);
    }
  };

  const handleViewCurrentLocation = async () => {
    if (loading) return;

    try {
      const newLocation = location || await new Promise(resolve => getLocation(resolve));
      if (status.plantId && newLocation) {
        setCurrentLocation(newLocation);
        const response = await getStartWalkLocation(status.plantId);
        if (response) {
          setStartLocation(response.data.data);
          setShowLocationModal(true);
        }
      } else {
        console.error("위치 정보를 가져오지 못했습니다.");
      }
    } catch (error) {
      console.error('현재 위치 조회에 실패했습니다:', error);
    }
  };

  const handleEndWalk = async () => {
    if (location) {
      try {
        let response = await endPlantWalk(status.plantId, location, userRoomId);
        const distanceCovered = response.data?.distance || 0;
        const speedCovered = response.data?.speed || 0;

        if (speedCovered > 20) {
          setErrorMessage("비정상적인 움직임이 감지되었습니다. 포인트가 적립되지 않습니다.");
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
        } else {
          setSuccessMessage(`${distanceCovered.toFixed(2)}km 산책을 종료했습니다!`);
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 3000);
        }
        setShowLocationModal(false);
        setStatus(prevStatus => ({ ...prevStatus, walker: 0 }));
      } catch (error) {
        console.error('산책 종료에 실패했습니다:', error);
      }
    }
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(false);
  };

  return {
    handleStartWalk,
    handleViewCurrentLocation,
    handleEndWalk,
    handleCloseLocationModal,
    startLocation,
    currentLocation,
    locationError: error,
    locationLoading: loading
  };
};

export default usePlantHook;
