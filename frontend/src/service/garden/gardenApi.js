import { axiosCommonInstance } from '../../apis/axiosInstance';

export const fetchYears = async ({ plantId, params }) => {
  try {
    const {data} = await axiosCommonInstance.get(`/plant/${plantId}/historys`, {params});
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

export const fetchFlowers = async () => {
  const {data} = await axiosCommonInstance.get('/plant/history');
  return data;
}