import { axiosCommonInstance } from '../../apis/axiosInstance';

export const fetchReadSchedule = async () => {
  const { data } = await axiosCommonInstance.get('/calendar/list');
  return data;
}

export const fetchCreateSchedule = async () => {
  const { data } = await axiosCommonInstance.post('/calendar/add');
  return data;
}

export const fetchUpdateSchedule = async () => {
  const { data } = await axiosCommonInstance.patch('/calendar/update');
  return data;
}

export const fetchDeleteSchedule = async () => {
  const { data } = await axiosCommonInstance.delete('/calendar/remove');
  return data;
}
