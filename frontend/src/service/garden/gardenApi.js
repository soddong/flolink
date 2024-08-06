import { axiosCommonInstance } from '../../apis/axiosInstance';

export const fetchYears = async ({ queryKey }) => {
  const [_, plantId, statusYear] = queryKey;
  try {
    console.log(statusYear)
    const {data} = await axiosCommonInstance.get(`/plants/${plantId}/historys`, {params: {year: statusYear}});
    return data;
  } catch (error) {
    console.log(plantId, statusYear)
    console.log('Error fetching items:', error);
    throw error;
  }
}

export const fetchFlowers = async () => {
  const {data} = await axiosCommonInstance.get('/plant/history');
  return data;
}