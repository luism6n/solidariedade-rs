import { useScript } from "@/hooks/useScript";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import { type MarkerExtended } from "@react-google-maps/marker-clusterer";
import { useEffect, useRef, useState, type LegacyRef } from "react";

const containerStyle = {
  width: "1000px",
  height: "600px",
};

interface MarkerType extends MarkerExtended {
  id: string;
  name: string;
  avatar: string;
  lat: number;
  lng: number;
  status: string;
}

const MarkerClustererComponent = ({
  markerData,
}: {
  markerData: MarkerType[];
}) => {
  const [center, setCenter] = useState({ lat: -23.5505199, lng: -46.6333094 });
  const [zoom, setZoom] = useState(6);
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  useEffect(() => {
    setMarkers(markerData);
  }, [markerData]);

  console.log(markers, markerData);

  const { isLoaded: isGoogleMapsLoaded } = useScript({
    name: "googleMaps",
  });

  const markerRef: LegacyRef<Marker> = useRef(null);

  if (!isGoogleMapsLoaded || markers.length === 0) {
    return <></>;
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      <MarkerClusterer>
        {(clusterer) => (
          <div>
            {markers.map((obj, i) => (
              <Marker
                ref={markerRef}
                key={i}
                position={{ lat: obj.lat, lng: obj.lng }}
                cursor="pointer"
                icon={{
                  scaledSize: new google.maps.Size(50, 50),
                  url: obj.avatar
                    ? `${obj.avatar}#custom_marker`
                    : "avatar_default.png#custom_marker_w/o_avatar",
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(25, 50),
                }}
                clusterer={clusterer}
              />
            ))}
          </div>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
};

export default MarkerClustererComponent;
