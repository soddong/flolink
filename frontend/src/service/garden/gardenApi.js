import { axiosCommonInstance } from '../../apis/axiosInstance';

export const fetchYears = async (plantId, statusYear) => {
    const {data} = await axiosCommonInstance.get(`/plants/${plantId}/historys`, {params: {year: statusYear}});
    return data;
  } 

export const fetchHistorys = async (plantId, historyId) => {
  const {data} = await axiosCommonInstance.get(`/plants/${plantId}/historys/${historyId}`);
  return data;
}