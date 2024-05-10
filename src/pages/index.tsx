"use client";

import { SheetData } from "@/types";
import { useEffect, useState } from "react";
import { PiCaretDownFill, PiInfo, PiMagnifyingGlassBold } from "react-icons/pi";

export default function Home() {
  const [data, setData] = useState<SheetData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/sheet");

      if (res.status === 200) {
        setData(await res.json());
      } else {
        setError(`${res.status} ${res.statusText}`);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Carregando...</p>;
  }

  const {
    sheet: {
      table: { cols, rows },
    },
  } = data;

  return (
    <div>
      <header className="w-full">
        <div className="p-lg bg-rose-700 flex flex-col gap-lg">
          <div className="w-full flex justify-between items-center">
            <div className="font-extrabold text-xl uppercase w-full text-white">
              <h1 className="p-1">Solidariedade</h1>
              <h2 className="bg-stone-700 max-w-fit p-1 rounded-md">
                Rio Grande do Sul
              </h2>
            </div>
            <PiInfo className="text-4xl" color="white" />
          </div>
          <div className="bg-white flex gap-md rounded-md p-md items-center">
            <input
              type="text"
              className="w-full"
              placeholder="Buscar por abrigo ou endereço"
            />
            <PiMagnifyingGlassBold className="text-2xl" />
          </div>
        </div>
        <div className="flex gap-lg justify-center bg-stone-700 text-white p-md items-center">
          <p>Filtros de busca</p>
          <PiCaretDownFill />
        </div>
      </header>

      {/* map cols to labels and rows use rows as values in a card without styling */}
      <main className="p-lg">
        <div className="grid grid-cols-1 gap-lg">
          {rows.map((row, i) => {
            return (
              <div key={i} className="bg-white p-md rounded-md">
                {cols.map((col, j) => {
                  if (col.label.startsWith("[ignore]")) {
                    return null;
                  }

                  // strip any [x] from col label
                  const label = col.label.replace(/\[.*\]/, "").trim();

                  if (!row.c[j]?.v) {
                    return null;
                  }

                  return (
                    <p key={j}>
                      <span className="font-semibold">{label}: </span>
                      {row.c[j]?.v}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
