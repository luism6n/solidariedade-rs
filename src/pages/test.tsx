// import MBPMap from "@/components/maps/MBPMap";
import MBPMap from "@/components/maps/MBPMap";
import { Place, getGeocoding } from "@/components/maps/mapUtils";
import { useScript } from "@/hooks/useScript";
import { useEffect, useState } from "react";

export default function Test() {
  const { isLoaded } = useScript({ name: "googleMaps" });

  const [coordinates, setCoordinates] = useState<Place["position"] | null>(
    null
  );

  const randomAddress =
    "Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200, Brazil";

  useEffect(() => {
    const init = async () => {
      const { lat, lng } = await getGeocoding(randomAddress);

      if (!lat || !lng) {
        console.error("Erro ao converter endereço em coordenadas");
        return;
      }

      setCoordinates({ lat, lng });
    };
    init();
  }, []);

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

  if (!coordinates || !isLoaded) {
    return <p>Carregando...</p>;
  }

  const { lat, lng } = coordinates;

  return (
    <>
      <h1>MAPA (test)</h1>
      <p>Test address: {randomAddress}</p>
      <p>
        Geocoded Address:
        {lat && lng ? (
          <span>
            Latitude: {lat}, Longitude: {lng}
          </span>
        ) : (
          <span>Erro ao converter endereço em coordenadas</span>
        )}
      </p>

      <MBPMap data={data} />
    </>
  );
}
