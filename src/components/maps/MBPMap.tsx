import {
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import Card from "../Card";
import BaseMap from "./BaseMap";
import CustomMarker, { CustomMarkerProps } from "./CustomMarker";
import { Place } from "./mapUtils";

function MBPMap({ places }: { places: Place[] }) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const [scope, animate] = useAnimate();
  const controls = useDragControls();
  const y = useMotionValue(0);

  const onMarkerClick = useCallback(
    (payload: Place) => {
      // should open a modal or something
      console.log(selectedPlace, payload);
      setSelectedPlace(payload);
      setIsCardOpen(true);
    },
    [selectedPlace, setSelectedPlace]
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
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex relative flex-1">
        <BaseMap
          className="grow"
          bounds={bounds}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControl={false}
          clickableIcons={false}
        >
          {markers
            ?.filter((m) => m.position?.lat && m.position.lng)
            .map((marker, i) => (
              <CustomMarker key={i} {...marker} />
            ))}
        </BaseMap>
        {isCardOpen && selectedPlace && (
          <motion.div
            className="fixed left-0 right-0 bottom-0 h-1/3 z-20 bg-white"
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
              className="absolute bottom-0 h-full overflow-hidden w-full"
            >
              <div className="absolute top-0 left-0 right-0 bg-white z-10 p-md">
                <button
                  className="w-full h-lg cursor-grab touch-none active:cursor-grabbing flex justify-center"
                  onPointerDown={(e) => {
                    controls.start(e);
                  }}
                >
                  <div className="h-xs w-2xl rounded-full bg-black" />
                </button>
              </div>
              <div className="p-md flex flex-col items-center gap-md relative z-0 top-10 h-full overflow-y-scroll">
                <Card
                  cols={selectedPlace.data.cols}
                  row={selectedPlace.data.row}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default MBPMap;
