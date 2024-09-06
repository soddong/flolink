import { axiosCommonInstance } from '../../apis/axiosInstance';

export const startPlantWalk = async (plantId, location, userRoomId) => {
    const { data } = await axiosCommonInstance.post(`/plants/${plantId}/walk-start`, {
        ...location,
        userRoomId
    });
    return data;
};

export const endPlantWalk = async (plantId, location, userRoomId) => {
    const { data } = await axiosCommonInstance.post(`/plants/${plantId}/walk-end`, {
        ...location,
        userRoomId
    });
    return data;
};

export const getStartWalkLocation = async (plantId) => {
    return axiosCommonInstance.get(`plants/${plantId}/start-location`);
};