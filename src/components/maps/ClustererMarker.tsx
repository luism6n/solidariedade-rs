import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Place } from "./CustomMarker";
import MarkerOverlay from "./MarkerOverlay";

export interface ClustererMarkerProps {
  lat: number;
  lng: number;
  map?: google.maps.Map;
  onClick: (payload: Place) => void;
  label: string;
}

export default function ClustererMarker({
  lat,
  lng,
  map,
  onClick,
  label,
}: ClustererMarkerProps) {
  return (
    <>
      {map && (
        <MarkerOverlay
          position={{
            lat: lat,
            lng: lng,
          }}
          map={map}
          zIndex={99}
        >
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
                "flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md",
                "border-2 border-mbp-green-500"
              )}
              onClick={() => onClick}
            >
              {label}
            </button>
          </motion.div>
        </MarkerOverlay>
      )}
    </>
  );
}
