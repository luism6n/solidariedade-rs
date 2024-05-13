import { Col, Row } from "@/types";
import Link from "next/link";

export default function Card({ cols, row }: { cols: Col[]; row: Row }) {
  return (
    <div className="bg-stone-100 p-md flex flex-col gap-lg rounded-md border border-stone-700">
      {cols.map((col, i) => {
        const { content, updatedAt } = row.cells[i];
        const label = col.name;

        if (!content) return null;

        if (col.hidden) {
          return null;
        } else if (Array.isArray(content)) {
          return (
            <div
              key={i}
              className="rounded-md border border-stone-200 bg-white p-md flex flex-col gap-md"
            >
              <p className="font-semibold text-stone-700">{label}</p>
              <ul className="list-disc list-inside">
                {content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          );
        } else if (label === "Nome") {
          return (
            <p className="font-bold text-lg" key={i}>
              {content}
            </p>
          );
        } else if (label === "Endereço") {
          return (
            <p className="font-semibold underline text-stone-700" key={i}>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${content}`}
                target="_blank"
                rel="noreferrer"
              >
                {content}
              </Link>
            </p>
          );
        } else {
          return (
            <div
              key={i}
              className="rounded-md border border-stone-200 bg-white p-md flex flex-col gap-md"
            >
              <div className="flex gap-md">
                <p className="font-semibold text-stone-700">{label}: </p>
                <p>{content}</p>
              </div>
              {updatedAt && (
                <p className="text-stone-700 text-sm">
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
