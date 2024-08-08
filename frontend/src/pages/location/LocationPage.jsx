import React, { useEffect, useState, useRef } from 'react';

const Location = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [prevLocation, setPrevLocation] = useState(null);
  const [distance, setDistance] = useState(0);
  const [watching, setWatching] = useState(false);
  const [error, setError] = useState(null);
  const [path, setPath] = useState([]);
  const watchIdRef = useRef(null);

  useEffect(() => {
    const startWatching = () => {
      if (!watchIdRef.current) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });

            if (prevLocation) {
              const dist = calculateDistance(
                prevLocation.latitude,
                prevLocation.longitude,
                latitude,
                longitude
              );
              setDistance((prevDistance) => prevDistance + dist);
            } 

            setPrevLocation({ latitude, longitude });
            setError(null);
          },
          (err) => {
            setError(err.message);
            setLocation({ latitude: null, longitude: null });
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      }
    };

    if (watching) {
      startWatching();
    } else {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    }
  }, [watching, prevLocation, path]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  };

  const handleStart = () => {
    setWatching(true);
    setDistance(0);
    setPrevLocation(null);
    setPath([]);
  };

  const handleStop = () => {
    setWatching(false);
  };

  return (
    <div>
      <h1>위치 추적</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>위도: {location.latitude}</p>
          <p>경도: {location.longitude}</p>
          <p>움직인 거리: {distance.toFixed(2)} meters</p>
        </div>
      )}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleStart} disabled={watching} style={buttonStyle}>
          Start
        </button>
        <button onClick={handleStop} disabled={!watching} style={buttonStyle}>
          Stop
        </button>
      </div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '0 5px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Location;