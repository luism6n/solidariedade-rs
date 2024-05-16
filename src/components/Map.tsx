// import MBPMap from "@/components/maps/MBPMap";
import MBPMap from "@/components/maps/MBPMap";
import { useScript } from "@/hooks/useScript";
import { Sheet } from "@/types";
import { Place } from "./maps/mapUtils";
import { useMemo } from "react";

export function Map({ data }: { data: Sheet }) {
  const { isLoaded } = useScript({ name: "googleMaps" });

  const places = useMemo(() => {
    const places: Place[] = [];

    for (const row of data.rows) {
      const cells = row.cells;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        if (cell.googleMaps && cell.lat && cell.lng) {
          places.push({
            id: cell.id,
            name: data.cols[i].name,
            position: {
              lat: cell.lat,
              lng: cell.lng,
            },
          });
        }
      }
    }

    return places;
  }, [data]);

  if (!isLoaded) {
    return <p>Carregando...</p>;
  }

  return <MBPMap places={places} />;
}
