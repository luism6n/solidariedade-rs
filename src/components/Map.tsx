// import MBPMap from "@/components/maps/MBPMap";
import MBPMap from "@/components/maps/MBPMap";
import { useScript } from "@/hooks/useScript";
import { Sheet } from "@/types";
import { useMemo } from "react";
import { Place } from "./maps/mapUtils";
import { Spinner } from "./Spinner";

export function Map({
  data,
  className,
  popupCard,
}: {
  data: Sheet;
  className?: string;
  popupCard?: boolean;
}) {
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
            item: {
              cols: data.cols,
              row: row,
            },
          });
        }
      }
    }

    return places;
  }, [data]);

  if (!isLoaded) {
    return (
      <div className={className}>
        <Spinner />
      </div>
    );
  }

  return <MBPMap className={className} places={places} popupCard={popupCard} />;
}
