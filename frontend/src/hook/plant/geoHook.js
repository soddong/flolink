import { useState } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = (callback) => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(newLocation);
        setLoading(false);
        if (callback) callback(newLocation);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };

  return { location, error, loading, getLocation };
};

export default useGeolocation;
