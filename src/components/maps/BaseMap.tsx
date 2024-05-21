import type { ReactElement } from "react";
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import style from "./mapStyle";
import { useDeepCompareEffectForMaps } from "./mapUtils";

interface ChildProps {
  map?: google.maps.Map;
}

export interface MapProps extends google.maps.MapOptions {
  className: string;
  bounds: google.maps.LatLngBounds;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: ReactElement<ChildProps>[] | ReactElement<ChildProps>;
}

export default function BaseMap({
  className,
  onClick,
  onIdle,
  bounds,
  children,
  ...options
}: MapProps) {
  const [map, setMap] = useState<google.maps.Map>();

  const createMap = useCallback(
    async (current: HTMLElement | null) => {
      if (!current || map !== undefined) {
        return;
      }

      const { Map } = (await google.maps.importLibrary(
        "maps",
      )) as typeof google.maps;

      const googleMap = new Map(current, {
        ...options,
        styles: style,
      });

      setMap(googleMap);
    },
    [map, options],
  );

  useEffect(() => {
    if (!map) {
      return;
    }

    // if more than one child, center and set zoom, else fit bounds
    // source: https://stackoverflow.com/a/3267775
    if (Children.count(children) <= 1) {
      map.setCenter(bounds.getCenter());
      map.setZoom(15);
    } else {
      map.fitBounds(bounds);
    }
  }, [map, bounds, children]);

  useDeepCompareEffectForMaps(() => {
    if (!map) {
      return;
    }

    map.setOptions({ ...options, styles: style });
  }, [map, options]);

  useEffect(() => {
    if (!map || !onClick) {
      return;
    }

    map.addListener("click", onClick);
  }, [map, onClick]);

  return (
    <>
      <div
        ref={(current) => {
          createMap(current);
        }}
        className={className}
      />
      {Children.map(children, (child) => {
        if (isValidElement<ChildProps>(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
}
