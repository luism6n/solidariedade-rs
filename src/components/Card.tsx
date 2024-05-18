import { Col, Row } from "@/types";
import Link from "next/link";
import { PiMapPinBold } from "react-icons/pi";
import Pill from "./Pill";

export default function Card({ cols, row }: { cols: Col[]; row: Row }) {
  return (
    <div className="bg-white p-md flex flex-col gap-lg rounded-md border-card">
      {cols.map((col, i) => {
        const { content, updatedAt, googleMaps } = row.cells[i];
        const label = col.name;

        if (!content) return null;

        if (col.hidden) {
          return null;
        } else if (col.link && typeof content === "string") {
          return (
            <div
              key={`${label}-${i}`}
              className="underline rounded-md border border-mbp-light-gray p-md flex flex-col gap-md"
            >
              <Link href={content} target="_blank" rel="noreferrer">
                {label}
              </Link>
            </div>
          );
        } else if (Array.isArray(content)) {
          return (
            <div
              key={`${label}-${i}`}
              className="rounded-md border border-mbp-light-gray p-md flex flex-col gap-md"
            >
              <p className="font-semibold text-mbp-dark-gray">{label}</p>
              <div className="flex flex-wrap gap-xs">
                {content.map((item, i) => (
                  <Pill key={i}>{item}</Pill>
                ))}
              </div>
            </div>
          );
        } else if (label === "Nome") {
          return (
            <p className="font-bold text-lg" key={`${label}-${i}`}>
              {content}
            </p>
          );
        } else if (googleMaps) {
          return (
            <div
              className="flex gap-sm items-center font-semibold underline text-mbp-dark-gray"
              key={`${label}-${i}`}
            >
              <PiMapPinBold className="text-xl flex-shrink-0" />
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${content}`}
                target="_blank"
                rel="noreferrer"
              >
                {content}
              </Link>
            </div>
          );
        } else {
          return (
            <div
              key={i}
              className="rounded-md border border-mbp-light-gray p-md flex flex-col gap-md"
            >
              <div className="flex gap-md">
                <p className="font-semibold text-mbp-dark-gray">{label}: </p>
                <p>{content}</p>
              </div>
              {updatedAt && (
                <p className="text-mbp-dark-gray text-sm">
                  Atualizado em {new Date(updatedAt).toLocaleString()}
                </p>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}
