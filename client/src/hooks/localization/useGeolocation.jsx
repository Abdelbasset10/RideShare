import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const successHandler = (pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition({ latitude, longitude });
    };

    const errorHandler = (err) => {
      setError(err.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const watchId = navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []); // Empty dependency array ensures that the effect runs only once

  return { position, error };
};

export default useGeolocation;
