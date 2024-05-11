"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import { Sheet } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<Sheet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Sheet | null>(null);

  const handleSearchResults = (filteredData: Sheet) => {
    setSearchResults(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/sheet");

        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }

        const sheetData = await res.json();
        setData(sheetData);
      } catch (error: React.ErrorInfo | any) {
        setError(error.message);
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

  const { cols, rows } = searchResults || data;

  return (
    <>
      <Header data={data} setSearchResults={handleSearchResults} />
      {/* <div className="MAP h-72 w-full bg-yellow-400">MAPA</div>
      <div className="bg-teal-600 p-lg font-semibold text-white hover:underline">
        Ver lista
      </div>
      <div className="bg-teal-600 p-lg font-semibold text-white hover:underline">
        Ver mapa
      </div> */}
      <main className="p-lg">
        <div className="grid grid-cols-1 gap-lg">
          {rows.length === 0 && (
            <p className="text-center">Nenhum resultado encontrado.</p>
          )}
          {rows.length !== 0 &&
            rows.map((row, i) => <Card key={i} cols={cols} row={row} />)}
        </div>
      </main>
    </>
  );
}
