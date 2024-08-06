import { useQuery } from 'react-query';
import { fetchYears, fetchHistorys } from '../../service/garden/gardenApi';

export const getYearData = (plantId, statusYear) => {
  return useQuery({
    queryKey: ['year', plantId, statusYear],
    queryFn: fetchYears,
  });
}

export const getHistoryData = (plantId, historyId) => {
  return useQuery({
    queryKey: ['history', plantId, historyId],
    queryFn: fetchHistorys,
  });
}