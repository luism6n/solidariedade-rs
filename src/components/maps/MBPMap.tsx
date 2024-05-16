import { useCallback, useMemo, useState } from "react";
import BaseMap from "./BaseMap";
import CustomMarker, { CustomMarkerProps } from "./CustomMarker";
import { Place } from "./mapUtils";

function MBPMap({ places }: { places: Place[] }) {
  const [center, setCenter] = useState({ lat: -30.0346471, lng: -51.2176584 }); // Porto Alegre
  const [zoom, setZoom] = useState(12);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const onMarkerClick = useCallback(
    (payload: Place) => {
      // should open a modal or something
      console.log(selectedPlace, payload);
      setSelectedPlace(payload);
    },
    [selectedPlace, setSelectedPlace]
  );

  const onIdle = useCallback(
    (map: google.maps.Map) => {
      setZoom(map.getZoom()!);

      const nextCenter = map.getCenter();

      if (nextCenter) {
        setCenter(nextCenter.toJSON());
      }
    },
    [setZoom, setCenter]
  );

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
      <div className="flex relative h-screen">
        <BaseMap
          className="grow"
          bounds={bounds}
          onIdle={onIdle}
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
      </div>
    </>
  );
}

export default MBPMap;
