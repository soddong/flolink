import { useQuery } from 'react-query';
import { fetchReadSchedule, fetchCreateSchedule, fetchUpdateSchedule, fetchDeleteSchedule } from '../../service/calendar/calendarApi.js'

export const readSchedule = (roomId, date) => {
  return useQuery({
    queryKey: ['read', roomId, date],
    queryFn: fetchReadSchedule,
  });
}

export const createSchedule = (roomId, title, tag, content, date) => {
  return useQuery({
    queryKey: ['create', roomId, title, tag, content, date],
    queryFn: fetchCreateSchedule,
  });
}

export const deleteSchedule = (roomId, calandarId) => {
  return useQuery({
    queryKey: ['delete', roomId, calandarId],
    queryFn: fetchDeleteSchedule,
  });
}

export const updateSchedule = (roomId, title, tag, content, date) => {
  return useQuery({
    queryKey: ['update', roomId, calendarId, title, tag, content, date],
    queryFn: fetchCreateSchedule,
  });
}