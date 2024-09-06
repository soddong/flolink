import { axiosCommonInstance } from '../../apis/axiosInstance';

export const fetchReadSchedule = async (dateCalendarRequest) => {
  const { data } = await axiosCommonInstance.post('/calendar/list', dateCalendarRequest);
  return data;
}

export const fetchCreateSchedule = async (calendarCreateRequest) => {
  const { data } = await axiosCommonInstance.post('/calendar/add', calendarCreateRequest);
  return data;
}

export const fetchUpdateSchedule = async (calendarUpdateRequest) => {
  const { data } = await axiosCommonInstance.patch('/calendar/update', calendarUpdateRequest);
  return data;
}

export const fetchDeleteSchedule = async (calendarId, roomId) => {
  const { data } = await axiosCommonInstance.delete('/calendar/remove', {data: {
    calendarId,
    roomId
  }});
  return data;
}
