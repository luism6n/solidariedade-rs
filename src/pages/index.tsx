"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import { Sheet } from "@/types";
import { useEffect, useState } from "react";

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
      <Header />
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
