// import MBPMap from "@/components/maps/MBPMap";
import MBPMap from "@/components/maps/MBPMap";
import { Place, getGeocoding } from "@/components/maps/mapUtils";
import { useScript } from "@/hooks/useScript";

export default function Test() {
  const { isLoaded } = useScript({ name: "googleMaps" });

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

  const randomAddress =
    "Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200, Brazil";
  const { lat, lng } = getGeocoding(randomAddress);

  return (
    <div className="">
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

      {isLoaded ? <MBPMap data={data} /> : <p>Carregando Mapa...</p>}
    </div>
  );
}
