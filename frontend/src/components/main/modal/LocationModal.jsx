import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const LocationModal = ({ onClose, startLocation, currentLocation, walkerNickname, walkerProfilePicture, buttonStatus, handleEndWalk }) => {
  const mapContainer = useRef(null);

useEffect(() => {
  if (mapContainer.current && window.kakao && startLocation && currentLocation) {
    const map = new window.kakao.maps.Map(mapContainer.current, {
      center: new window.kakao.maps.LatLng(
        (startLocation.lat + currentLocation.lat) / 2,
        (startLocation.lng + currentLocation.lng) / 2
      ),
      level: 3,
    });

    const startIcon = new window.kakao.maps.MarkerImage(
      '/location/start-maker.png',
      new window.kakao.maps.Size(30, 35)
    );

    const currentIcon = new window.kakao.maps.MarkerImage(
      `/profile/${walkerProfilePicture}.png`,
      new window.kakao.maps.Size(32, 32)
    );

    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(startLocation.lat, startLocation.lng),
      map: map,
      image: startIcon,
      title: '시작점',
    });

    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng),
      map: map,
      image: currentIcon,
      title: '현재 위치',
    });

    const bounds = new window.kakao.maps.LatLngBounds();
    bounds.extend(new window.kakao.maps.LatLng(startLocation.lat, startLocation.lng));
    bounds.extend(new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng));
    map.setBounds(bounds);

    const polyline = new window.kakao.maps.Polyline({
      path: [
        new window.kakao.maps.LatLng(startLocation.lat, startLocation.lng),
        new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng),
      ],
      strokeWeight: 5,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
    });
    polyline.setMap(map);
  }
}, [startLocation, currentLocation, walkerProfilePicture]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">{walkerNickname} 님의 위치</h2>
        <div ref={mapContainer} style={{ height: '300px' }}></div>
        <div className="mt-4 flex items-center">
          {buttonStatus === 2 && (
            <>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded w-full mt-2 mr-2"
                onClick={handleEndWalk}
              >
                산책 종료
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded w-full mt-2"
                onClick={onClose}
              >
                닫기
              </button>
            </>
          )}
          {buttonStatus !== 2 && (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded w-full mt-2"
              onClick={onClose}
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

LocationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  startLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  currentLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  walkerNickname: PropTypes.string.isRequired,
  walkerProfilePicture: PropTypes.string.isRequired,
  buttonStatus: PropTypes.number.isRequired,
  handleEndWalk: PropTypes.func.isRequired,
};

export default LocationModal;
