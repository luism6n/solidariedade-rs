import { useCallback, useMemo, useState } from "react";
import BaseMap from "./BaseMap";
import CustomMarker, { CustomMarkerProps } from "./CustomMarker";
import { Place } from "./mapUtils";

function MBPMap({ data }: { data: { places: Place[] } }) {
  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom()!);

    const nextCenter = map.getCenter();

    if (nextCenter) {
      setCenter(nextCenter.toJSON());
    }
  };

  const [center, setCenter] = useState({ lat: -30.0346471, lng: -51.2176584 }); // Porto Alegre
  const [zoom, setZoom] = useState(7);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const onMarkerClick = useCallback(
    (payload: Place) => {
      // should open a modal or something
      console.log(selectedPlace);
    },
    [selectedPlace]
  );

  const markers: CustomMarkerProps[] = useMemo(() => {
    return (
      data.places?.map((place) => ({
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
  }, [data.places, onMarkerClick]);
  let map: google.maps.Map;
  async function initMap(): Promise<void> {
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }

  initMap();

  if (markers.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex relative h-screen">
        <BaseMap
          className="grow h-full"
          center={center}
          zoom={zoom}
          minZoom={2}
          maxZoom={18}
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
