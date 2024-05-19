import { useEffect, useMemo, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type OverlayProps = PropsWithChildren<{
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  pane?: keyof google.maps.MapPanes;
  map: google.maps.Map;
  zIndex?: number;
}>;

export default function MarkerOverlay({
  position,
  pane = "floatPane",
  map,
  zIndex,
  children,
}: OverlayProps) {
  const container = useMemo(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    return div;
  }, []);

  const overlay = useMemo(() => {
    class Overlay extends google.maps.OverlayView {
      constructor(
        public container: HTMLElement,
        public pane: keyof google.maps.MapPanes,
        public position: google.maps.LatLng | google.maps.LatLngLiteral,
      ) {
        super();
      }

      onAdd = (): void => {
        this.getPanes()?.[this.pane]?.appendChild(this.container);
      };

      draw = (): void => {
        const { x, y } = this.getProjection()?.fromLatLngToDivPixel(
          this.position,
        ) ?? { x: 0, y: 0 };
        if (x !== 0 || y !== 0) {
          this.container.style.transform = `translate(${x}px, ${y}px)`;
        }
      };

      onRemove = (): void => {
        this.container.parentNode?.removeChild(this.container);
      };
    }
    return new Overlay(container, pane, position);
  }, [container, pane, position]);

  useEffect(() => {
    overlay.setMap(map);
    return () => overlay.setMap(null);
  }, [map, overlay]);

  useEffect(() => {
    container.style.zIndex = `${zIndex ?? 0}`;
  }, [zIndex, container]);

  return createPortal(children, container);
}
