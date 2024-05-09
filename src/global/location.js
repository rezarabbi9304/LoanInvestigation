import React, { useEffect, useState } from "react";
import { areLocationsClose } from "./utils/locationDistanceMeter";

function LocationComponent() {
  const [location, setLocation] = useState(null);
  const [location2, setLocation2] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (location == null) {
            setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
          } else {
            setLocation2(`Latitude: ${latitude}, Longitude: ${longitude}`);
          }

        },
        (error) => {
          setLocation(`Error getting location: ${error.message}`);
         
        }
      );
    } else {
      setLocation("Geolocation is not supported by your browser");
    }

    const iscloser = areLocationsClose();
  };

  // const intervalId = setInterval(getLocation, 10000);
  //
  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
      <p>{location}</p>
    </div>
  );
}

export default LocationComponent;
