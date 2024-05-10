"use client";

import Card from "@/components/Card";
import { Sheet } from "@/types";
import { useEffect, useState } from "react";
import { PiCaretDownFill, PiInfo, PiMagnifyingGlassBold } from "react-icons/pi";

export default function Home() {
  const [data, setData] = useState<Sheet | null>(null);
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

  const { cols, rows } = data;

  return (
    <body>
      <header className="w-full">
        <div className="p-lg bg-rose-700 flex flex-col gap-lg">
          <div className="w-full flex justify-between items-center">
            <div className="font-extrabold text-xl uppercase w-full text-white">
              <h1 className="p-1">Campanha Popular de Solidariedade</h1>
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

      <div className="MAP h-72 w-full bg-yellow-400">MAPA</div>
      <div className="bg-green-400 p-lg font-semibold text-white">
        Ver lista
      </div>
      <div className="bg-green-400 p-lg font-semibold text-white">Ver mapa</div>

      <main className="p-lg">
        <div className="grid grid-cols-1 gap-lg">
          {rows.map((row, i) => {
            return <Card key={i} cols={cols} row={row} />;
          })}
        </div>
      </main>
    </body>
  );
}
