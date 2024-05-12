import { Cell, Col, Row } from "@/types";
import Link from "next/link";

export default function Card({ cols, row }: { cols: Col[]; row: Row }) {

  let bairro_index = 0;
  let municipio_index = 0;
  for (let i = 0; i < cols.length; i++) {
    if (cols[i].name === "Bairro") {
      bairro_index = i;
    }
    if (cols[i].name === "Município") {
      municipio_index = i;
    }
  }

  return (
    <div className="bg-stone-100 p-md flex flex-col gap-lg rounded-md border border-stone-700">
      {cols.map((col, i) => {
        const cell = row.cells[i];
        const label = col.name;

        if (col.tags.includes("ignore")) {
          return null;
        }

        if (cell === null) return null;

        if (label === "Nome") {
          return (
            <p className="font-bold text-lg" key={i}>
              {cell}
            </p>
          );
        } else if (label === "Endereço") {
          const endereco = row.cells[i];
          const bairro = row.cells[bairro_index] ? "," + row.cells[bairro_index] : "";
          const municipio = "," + row.cells[municipio_index];
          return (
            <p className="font-semibold underline text-stone-700" key={i}>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${endereco}${bairro}${municipio},RS`}
                target="_blank"
                rel="noreferrer"
              >
                {cell}
              </Link>
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

const RegularRow = ({ label, cell }: { label: string; cell: Cell }) => {
  return (
    <div className="font-semibold rounded-md border border-stone-200 bg-white p-md flex gap-md">
      <p>{label}: </p>
      <p>{cell}</p>
    </div>
  );
};
