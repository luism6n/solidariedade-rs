import { Col, Row } from "@/types";
import { createCustomEqual, type State } from "fast-equals";
import { useEffect, useRef } from "react";

export type Place = {
  status?: string; // "full" | "vacancies";
  id: number;
  name: string;
  position: { lat: number; lng: number };
  item: {
    cols: Col[];
    row: Row;
  };
};

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
      meta: State<undefined>,
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
  dependencies: unknown[],
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
