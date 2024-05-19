import { motion } from "framer-motion";
import { useCallback } from "react";
import { PiMapPinDuotone } from "react-icons/pi";
import MarkerOverlay from "./MarkerOverlay";
import { Place } from "./mapUtils";

export interface CustomMarkerProps extends google.maps.MarkerOptions {
  place: Place;
  position: google.maps.LatLngLiteral;
  map?: google.maps.Map;
  onClick: (payload: Place) => void;
  highlight?: boolean;
  status?: string;
}

export function transformPlaceToMarker({
  place,
}: {
  place: Place;
  onClick: (payload: Place) => void;
  highlight?: boolean;
}): google.maps.MarkerOptions {
  return {
    position: { lat: place.position.lat, lng: place.position.lng },
    clickable: true,
    cursor: "pointer",
    draggable: false,
    icon: null,
    label: place.name,
    opacity: 1,
    title: place.status,
    visible: true,
    zIndex: 0,
    animation: null,
  };
}

export default function CustomMarker({
  place,
  position,
  map,
  onClick,
  highlight,
}: CustomMarkerProps) {
  const handleClick = useCallback(() => {
    onClick(place);
  }, [onClick, place]);

  if (!map) {
    return null;
  }

  return (
    <MarkerOverlay position={position} map={map} zIndex={highlight ? 99 : 0}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: Math.random() * 0.3 } }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
      >
        <button onClick={handleClick}>
          <PiMapPinDuotone className="text-xl text-mbp-red-700" />
        </button>
      </motion.div>
    </MarkerOverlay>
  );
}
