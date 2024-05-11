import { Col, Row } from "@/types";

export default function Card({ cols, row }: { cols: Col[]; row: Row }) {
  return (
    <div className="bg-stone-100 p-md flex flex-col gap-lg rounded-md border border-stone-700">
      {cols.map((col, i) => {
        const cell = row.cells[i];
        const label = col.name;

        if (col.tags.includes("ignore")) {
          return null;
        }
        if (!cell) return null;

        if (label === "Nome") {
          return (
            <p className="font-bold text-lg" key={i}>
              {cell}
            </p>
          );
        } else if (label === "Endereço") {
          return (
            <p className="font-semibold underline text-stone-700" key={i}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${cell}`}
                target="_blank"
                rel="noreferrer"
              >
                {cell}
              </a>
            </p>
          );
          // } else if (label === "Contato") {
          //   return (
          //     <p className="font-semibold" key={i}>
          //       {cell}
          //     </p>
          //   );
        } else {
          return <RegularRow key={i} label={label} cell={cell} />;
        }
      })}
    </div>
  );
}

const RegularRow = ({ label, cell }: { label: string; cell: string }) => {
  return (
    <div className="font-semibold rounded-md border border-stone-200 bg-white p-md flex gap-md">
      <p>{label}: </p>
      <p>{cell}</p>
    </div>
  );
};