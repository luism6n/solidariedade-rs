"use client";

import Card from "@/components/Card";
import Header, { type NetworkState } from "@/components/Header";
import { Sheet } from "@/types";
import { useEffect, useState } from "react";

function normalizeCellForComparison(content: Cell["content"]) {
  if (content === null) return "";
  return content
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function Home() {
  const [data, setData] = useState<Sheet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Sheet | null>(null);
  const [networkState, setNetworkState] = useState<NetworkState>({
    online: true,
    lastFetchTime: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [chosenValues, setChosenValues] = useState<Record<number, any>>({});

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilter = (colIndex: number, choice: string) => {
    setChosenValues((prev) => ({
      ...prev,
      [colIndex]: choice,
    }));
  };

  function handleClear() {
    setChosenValues({});
    setSearchQuery("");
  }

  useEffect(() => {
    const fetchData = async () => {
      let res: Awaited<ReturnType<typeof fetch>>;

      const fetchTime = new Date();
      try {
        res = await fetch("/api/sheet");
      } catch (error: unknown) {
        setNetworkState((ns) => ({
          ...ns,
          online: false,
        }));
        return;
      }

      if (!res.ok) {
        console.error(
          `failed to fetch sheet ${res.status} ${res.statusText}:`,
          res
        );
        setError(`${res.status} ${res.statusText}`);
        return;
      }

      // if the Date header is older than the fetch time, we're offline and the
      // service worker is serving a cached response
      const responseTime = new Date(res.headers.get("Date") || "");
      if (responseTime < fetchTime) {
        setNetworkState({
          online: false,
          lastFetchTime: responseTime,
        });
      } else {
        setNetworkState({
          online: true,
          lastFetchTime: responseTime,
        });
      }

      let sheetData: Sheet;
      try {
        sheetData = await res.json();
      } catch (error: unknown) {
        console.error("error extracting JSON from response:", error);
        setError("Erro interno");
        return;
      }

      setData(sheetData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    // filter by search query
    const normalizedQuery = normalizeCellForComparison(searchQuery);
    let filteredData: Sheet = data;

    if (normalizedQuery.trim() !== "" && data) {
      filteredData = {
        ...filteredData,
        rows: filteredData.rows.filter((row) => {
          return row?.cells.some((cell) =>
            normalizeCellForComparison(cell.content).includes(normalizedQuery)
          );
        }),
      };
    }

    // filter by chosen values
    filteredData = {
      ...filteredData,
      rows: filteredData.rows.filter((row) => {
        return row.cells.every(
          (cell, index) =>
            chosenValues[index] === undefined ||
            cell.content === chosenValues[index]
        );
      }),
    };

    setSearchResults(filteredData);
  }, [chosenValues, data, setSearchResults, searchQuery, setChosenValues]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    if (networkState.online) {
      return <p>Carregando...</p>;
    } else {
      return <p>Você está offline e sem dados anteriores.</p>;
    }
  }

  const { cols, rows } = searchResults || data;

  return (
    <>
      <Header
        data={data}
        onSearch={handleSearch}
        onFilter={handleFilter}
        chosenValues={chosenValues}
        clearFilters={handleClear}
        searchQuery={searchQuery}
        networkState={networkState}
      />

      <main className="p-lg bg-gray">
        <div className="gap-lg mb-4">
          <p className="font-medium">Encontre locais precisando de doações e atendimento voluntário.</p>
          <p>Região atendida: Porto Alegre, RS</p>
        </div>
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
