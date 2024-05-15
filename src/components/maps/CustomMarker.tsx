import { type MarkerExtended } from "@react-google-maps/marker-clusterer";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import MarkerOverlay from "./MarkerOverlay";

export type Place = {
  status: string; // "full" | "vacancies";
  id: number;
  name: string;
  position: { lat: number; lng: number };
};

export interface CustomMarkerProps extends MarkerExtended {
  place: Place;
  position: google.maps.LatLngLiteral;
  map?: google.maps.Map;
  onClick: (payload: any) => void;
  highlight?: boolean;
  status?: string;
}

export function transformPlaceToMarker({
  place,
}: // onClick,
// highlight,
{
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
    title: "",
    visible: true,
    zIndex: 0,
    animation: null,
  };
}

export default function CustomMarker({
  place,
  position,
  //   cursor,
  //   animation,
  //   icon,
  map,
  onClick,
  highlight,
}: CustomMarkerProps) {
  const handleClick = useCallback(() => {
    onClick(place);
  }, [onClick, place]);

  return (
    <>
      {map && (
        <MarkerOverlay
          position={position}
          map={map}
          zIndex={highlight ? 99 : 0}
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
                "rounded-full aspect-square overflow-hidden ring-2 shadow-lg",
                // place.status === "full" ? "ring-red-500" : "ring-green-500"
                ""
              )}
              onClick={handleClick}
            >
              {/* <Image src={""} alt={place.name} width={50} height={50} /> */}

              <div
                className={twMerge(
                  "flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md",
                  "border-2 border-mbp-green-500"
                )}
              >
                {place?.name ?? "No name"}
              </div>
            </button>
          </motion.div>
        </MarkerOverlay>
      )}
    </>
  );
}
