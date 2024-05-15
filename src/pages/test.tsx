// import MBPMap from "@/components/maps/MBPMap";
import MBPMap from "@/components/maps/MBPMap";
import { useScript } from "@/hooks/useScript";
import React, { SetStateAction } from "react";

export default function Test() {
  const { isLoaded } = useScript({ name: "googleMaps" });

  // let map: google.maps.Map;
  // async function initMap(): Promise<void> {
  //   const { Map } = (await google.maps.importLibrary(
  //     "maps"
  //   )) as google.maps.MapsLibrary;
  //   map = new Map(document.getElementById("map") as HTMLElement, {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // }

  // initMap();

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map as unknown as SetStateAction<null>); // fix this
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  return (
    <div className="">
      <h1>TEST</h1>
      {/* {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <></>
        </GoogleMap>
      ) : (
        <></>
      )} */}

      {isLoaded ? <MBPMap /> : <></>}
    </div>
  );
}
