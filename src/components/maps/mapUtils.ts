import { createCustomEqual, type State } from "fast-equals";
import { useEffect, useRef } from "react";

export type Place = {
  status: string; // "full" | "vacancies";
  id: number;
  name: string;
  position: { lat: number; lng: number };
};

export async function getGeocoding(
  address: string
): Promise<{ lat: number | null; lng: number | null }> {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

  try {
    const response = await fetch(geocodingUrl);
    const data = await response.json();

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      return { lat: latitude, lng: longitude };
    } else {
      console.error("Erro ao converter endereço em coordenadas:", data.status);
      return { lat: null, lng: null };
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação de geocodificação:", error);
    return { lat: null, lng: null };
  }
}

type MaybeLatLngLiteral = google.maps.LatLngLiteral | null;

const isLatLngLiteral = (obj: unknown): obj is MaybeLatLngLiteral => {
  return (
    obj !== null && typeof obj === "object" && "lat" in obj && "lng" in obj
  );
};

const deepCompareEqualsForMaps = createCustomEqual({
  createInternalComparator: (compare: any) => {
    return (
      a: google.maps.LatLngLiteral,
      b: google.maps.LatLngLiteral,
      meta: State<undefined>
    ) => {
      if (isLatLngLiteral(a) || isLatLngLiteral(b)) {
        return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
      }
      return compare(a, b, meta);
    };
  },
});

export function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: unknown[]
) {
  const deepDependencies = dependencies.map(useDeepCompareMemorize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, deepDependencies);
}

function useDeepCompareMemorize(value: unknown) {
  const ref = useRef<unknown>();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
