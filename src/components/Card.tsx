import { Col, Row } from "@/types";
import Link from "next/link";

export default function Card({ cols, row }: { cols: Col[]; row: Row }) {
  return (
    <div className="bg-stone-100 p-md flex flex-col gap-lg rounded-md border border-stone-700">
      {cols.map((col, i) => {
        const cell = row.cells[i];

        const label = col.name;
        const content = cell.content;
        if (!content) return null;
        const updatedAt = cell.updatedAt;

        if (col.tags.includes("ignore")) {
          return null;
        }

        if (col.tags.includes("updated")) {
          return (
            <div
              key={i}
              className="font-semibold rounded-md border border-stone-200 bg-white p-md flex gap-md"
            >
              <p className="text-stone-700">{label}: </p>
              <p>{new Date(content).toLocaleDateString()}</p>
            </div>
          );
        } else if (col.tags.includes("list")) {
          return (
            <div
              key={i}
              className="font-semibold rounded-md border border-stone-200 bg-white p-md flex flex-col gap-md"
            >
              <p className="font-semibold text-stone-700">{label}</p>
              <ul className="list-disc list-inside">
                {content
                  .toString()
                  .split(";")
                  .map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
              </ul>
            </div>
          );
        }

        if (label === "Nome") {
          return (
            <p className="font-bold text-lg" key={i}>
              {content}
            </p>
          );
        } else if (label === "Endereço") {
          return (
            <p className="font-semibold underline text-stone-700" key={i}>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${cell}`}
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
              className="font-semibold rounded-md border border-stone-200 bg-white p-md flex gap-md"
            >
              {/* {col.tags} */}
              <p className="text-stone-700">{label}: </p>
              <p>{content}</p>
            </div>
          );
        }
      })}
    </div>
  );
}
