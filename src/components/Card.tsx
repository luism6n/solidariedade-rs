import { Col, Row } from "@/types";
import Link from "next/link";

function formatDate(dateStr: string): Date {
  // Extract only what's inside the parenthesis
  const extractedContents = dateStr.match(/\(([^)]+)\)/)?.[1];

  if (!extractedContents) {
    throw new Error("Invalid date string format.");
  }

  // Split the contents by commas to get individual values
  const [year, month, day, hour, minute, second] = extractedContents.split(",");

  // Create a new Date object using the extracted values
  const formattedDate = new Date(
    parseInt(year),
    parseInt(month) - 1, // Month is zero-based in JavaScript Date object
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second)
  );

  return formattedDate;
}

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

        if (col.tags.includes("updated") && typeof content === "string") {
          return (
            <div
              key={i}
              className="rounded-md border border-stone-200 bg-white p-md flex gap-md"
            >
              <p className="font-semibold text-stone-700">{label}: </p>
              <p>Updated at: {formatDate(content).toLocaleString()}</p>
            </div>
          );
        } else if (col.tags.includes("list")) {
          return (
            <div
              key={i}
              className="rounded-md border border-stone-200 bg-white p-md flex flex-col gap-md"
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
              className="rounded-md border border-stone-200 bg-white p-md flex gap-md"
            >
              {/* {col.tags} */}
              <p className="font-semibold text-stone-700">{label}: </p>
              <p>{content}</p>
              {/* {updatedAt && (
                <p className="text-stone-500">
                  (última atualização:{" "}
                  {new Date(updatedAt).toLocaleDateString()})
                </p>
              )} */}
            </div>
          );
        }
      })}
    </div>
  );
}
