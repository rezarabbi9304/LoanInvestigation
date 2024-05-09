import React, { useEffect, useState } from "react";

function useLocation() {
  const [location, setLocation] = useState<any>(null);
  const [locationError, setLocationError] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (location == null) {
            // setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
            setLocation({ Latitude: latitude, Longitude: longitude });
          }
        },
        (error) => {
          setLocationError(`Please provide  location Access: ${error.message}`);
        }
      );
    } else {
      setLocation("Geolocation is not supported by your browser");
    }
  };

  return {
    getLocation,
    location,
    setLocation,
    setLocationError,
    locationError,
  };
}

export default useLocation;
