import { useQuery } from 'react-query';
import { fetchYears, fetchFlowers } from '../../service/garden/gardenApi';

export const getYearData = (plantId, statusYear) => {
  return useQuery({
    queryKey: ['year', plantId, statusYear],
    queryFn: fetchYears,
  });
}