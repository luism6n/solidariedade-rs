import { useCallback, useMemo, useState } from "react";
import BaseMap from "./BaseMap";
import CustomMarker, { CustomMarkerProps } from "./CustomMarker";
import { Place } from "./mapUtils";

function MBPMap() {
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

  const data: { places: Place[] } = {
    places: [
      {
        id: 1,
        name: "São Paulo",
        position: { lat: -23.5505199, lng: -46.6333094 },
        status: "full",
      },
      {
        id: 2,
        name: "Rio de Janeiro",
        position: { lat: -22.9068467, lng: -43.1728965 },
        status: "vacancies",
      },
    ],
  };

  const onMarkerClick = useCallback(
    (payload: Place) => {
      // openDialog(<PetMapDialog pet={payload} />);
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
