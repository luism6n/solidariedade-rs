import type { ReactElement } from "react";
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "./mapStyle";
import { useDeepCompareEffectForMaps } from "./mapUtils";

interface ChildProps {
  map?: google.maps.Map;
}

export interface MapProps extends google.maps.MapOptions {
  className: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: ReactElement<ChildProps>[] | ReactElement<ChildProps>;
  bounds?: google.maps.LatLngBounds;
}

export default function BaseMap({
  className,
  onClick,
  onIdle,
  bounds,
  children,
  ...options
}: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (!ref.current || map !== undefined) {
      return;
    }

    const googleMap = new window.google.maps.Map(ref.current, {
      styles: style,
    });
    setMap(googleMap);
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (!map) {
      return;
    }

    map.setOptions(options);
  }, [map, options]);

  useEffect(() => {
    if (!map || !onClick) {
      return;
    }

    map.addListener("click", onClick);
  }, [map, onClick, onIdle]);

  useEffect(() => {
    if (!map || !bounds) {
      return;
    }

    map.setOptions({ maxZoom: 18 });
    map.fitBounds(bounds);
    map.setOptions({ maxZoom: undefined });
  }, [map, bounds]);

  return (
    <>
      <div ref={ref} className={className} />
      {Children.map(children, (child) => {
        if (isValidElement<ChildProps>(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
}
