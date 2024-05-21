import {
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import BaseMap from "./BaseMap";
import CustomMarker, { CustomMarkerProps } from "./CustomMarker";
import { Place } from "./mapUtils";
import { CardContent } from "@/components/CardContent";
import { Card } from "@/components/Card";
import { twMerge } from "tailwind-merge";
import { Spinner } from "../Spinner";

function MBPMap({
  places,
  className,
  popupCard = true,
}: {
  places: Place[];
  className?: string;
  popupCard?: boolean;
}) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const [scope, animate] = useAnimate();
  const controls = useDragControls();
  const y = useMotionValue(0);

  const onMarkerClick = useCallback(
    (payload: Place) => {
      if (!popupCard) {
        return;
      }

      // should open a modal or something
      console.log(selectedPlace, payload);
      setSelectedPlace(payload);
      setIsCardOpen(true);
    },
    [selectedPlace, setSelectedPlace, popupCard],
  );

  const yStart = typeof y.get() === "number" ? y.get() : 0;

  const closeCard = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });
    await animate("#drawer", {
      y: [yStart, 500],
    });
    setIsCardOpen(false);
    setSelectedPlace(null);
  };

  const bounds = useMemo(() => {
    const bounds = new google.maps.LatLngBounds();

    if (!places) {
      return bounds;
    }

    for (const place of places) {
      bounds.extend(place.position);
    }

    return bounds;
  }, [places]);

  const markers: CustomMarkerProps[] = useMemo(() => {
    return (
      places.map((place) => ({
        place,
        onClick: onMarkerClick,
        getAnimation: () => null,
        setAnimation: () => {}, // Defina apenas os setters que você precisa modificar
        setClickable: () => {}, // Defina apenas os setters que você precisa modificar
        position: place.position,
        label: place.name,
        cursor: "pointer",
      })) ?? []
    );
  }, [places, onMarkerClick]);

  if (markers.length === 0) {
    return (
      <div className={className}>
        <Spinner />;
      </div>
    );
  }

  return (
    <div className="relative flex flex-1">
      <BaseMap
        className={twMerge("grow", className)}
        bounds={bounds}
        fullscreenControl={false}
        streetViewControl={false}
        mapTypeControl={false}
        zoomControl={false}
        clickableIcons={false}
        gestureHandling={"greedy"}
      >
        {markers
          ?.filter((m) => m.position?.lat && m.position.lng)
          .map((marker, i) => <CustomMarker key={i} {...marker} />)}
      </BaseMap>
      {isCardOpen && selectedPlace && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-20 h-1/3"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          onClick={closeCard}
          ref={scope}
        >
          <motion.div
            id="drawer"
            onClick={(e) => e.stopPropagation()}
            style={{ y }}
            initial={{
              y: "100%",
            }}
            animate={{
              y: "0%",
            }}
            transition={{ ease: "easeInOut" }}
            drag="y"
            onDragEnd={() => {
              if (y.get() > 100) {
                closeCard();
              }
            }}
            dragControls={controls}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
            className="absolute bottom-0 h-full w-full overflow-hidden bg-white"
          >
            <div className="absolute left-0 right-0 top-0 z-10">
              <button
                className="flex h-lg w-full cursor-grab touch-none justify-center bg-white p-md active:cursor-grabbing"
                onPointerDown={(e) => {
                  controls.start(e);
                }}
              >
                <div className="h-[5px] w-[64px] rounded-full bg-mbp-dark-gray" />
              </button>
            </div>
            <div className="relative z-0 flex h-full flex-col items-center gap-md overflow-y-scroll p-md py-xl">
              <Card>
                <CardContent
                  cols={selectedPlace.item.cols}
                  row={selectedPlace.item.row}
                />
              </Card>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default MBPMap;
