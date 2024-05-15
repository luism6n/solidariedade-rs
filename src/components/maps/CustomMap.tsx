import BaseMap from "./BaseMap";
import CustomMarker, { Place, type CustomMarkerProps } from "./CustomMarker";

interface GoogleMapProps {
  onIdle?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onMarkerClick: (payload: Place) => void;
  markers?: CustomMarkerProps[];
  center: google.maps.LatLngLiteral;
  zoom: number;
  highlightedMarkerId?: string;
}

export default function CustomMap({
  onClick,
  onIdle,
  zoom,
  center,
  markers,
}: GoogleMapProps) {
  return (
    <div className="flex h-full">
      <BaseMap
        className="grow h-full"
        center={center}
        zoom={zoom}
        minZoom={2}
        maxZoom={18}
        onIdle={onIdle}
        onClick={onClick}
        fullscreenControl={false}
        streetViewControl={false}
        mapTypeControl={false}
        zoomControl={false}
        clickableIcons={false}
      >
        {markers?.map((marker, i) => (
          <CustomMarker key={i} {...marker} />
        ))}
      </BaseMap>
    </div>
  );
}

// https://codesandbox.io/s/react-map-cluster-um0v6?file=/src/App.js:2029-3666
