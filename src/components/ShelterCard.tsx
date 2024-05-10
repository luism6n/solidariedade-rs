export default function ShelterCard({ row, cols }) {
  return (
    <div className="bg-stone-100 p-md flex flex-col gap-lg rounded-md border border-stone-700">
      {cols.map((col, i) => {
        if (col.label.startsWith("[ignore]")) {
          return null;
        }

        // strip any [x] from col label
        const label = col.label.replace(/\[.*\]/, "").trim();
        if (!row.c[i]?.v) {
          return null;
        }
        if (label === "Nome") {
          return (
            <p className="font-bold text-lg" key={i}>
              {row.c[i].v}
            </p>
          );
        } else if (label === "Endereço") {
          return (
            <p className="font-semibold underline text-stone-700" key={i}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${row.c[i].v}`}
                target="_blank"
                rel="noreferrer"
              >
                {row.c[i].v}
              </a>
            </p>
          );
        } else if (label === "Contato") {
          return (
            <p className="font-semibold" key={i}>
              {row.c[i].v}
            </p>
          );
        } else {
          return <CommonRow key={i} label={label} row={row.c[i].v} />;
        }
      })}
    </div>
  );
}

const CommonRow = ({ label, row }: { label: string; row: any }) => {
  return (
    <div className="font-semibold rounded-md border border-stone-200 bg-white p-md flex gap-md">
      <p>{label}: </p>
      <p>{row}</p>
    </div>
  );
};
