import { motion } from "framer-motion";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
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
    position: { lat: place?.position.lat || 0, lng: place?.position.lng || 0 },
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
        <button
          className={twMerge(
            "rounded-full aspect-square overflow-hidden ring-2 shadow-lg"
          )}
          onClick={handleClick}
        >
          <div
            className={twMerge(
              "flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md",
              "border-2 border-mbp-green-500"
            )}
          >
            {place?.name}
          </div>
        </button>
      </motion.div>
    </MarkerOverlay>
  );
}
