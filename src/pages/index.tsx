"use client";

import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { type NetworkState } from "@/components/Header";
import { Cell, Col, Row, Sheet } from "@/types";
import { useCallback, useEffect, useState } from "react";

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
  const [chosenValues, setChosenValues] = useState<
    Record<number, Cell["content"]>
  >({});

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
    },
    [setSearchQuery]
  );

  const handleFilter = useCallback(
    (colIndex: number, choice: string) => {
      setChosenValues((prev) => ({
        ...prev,
        [colIndex]: choice,
      }));
    },
    [setChosenValues]
  );

  const handleClear = useCallback(() => {
    setChosenValues({});
    setSearchQuery("");
  }, [setChosenValues, setSearchQuery]);

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
        return row.cells.every((cell, index) => {
          if (chosenValues === null) {
            return true;
          }

          const value = chosenValues[index];
          const content = cell.content;

          if (!value) {
            return true;
          }

          if (!content || typeof content !== "string") {
            return false;
          }

          if (!Array.isArray(value)) {
            return content === value;
          } else {
            if (data.cols[index].filterWithOr) {
              return value.includes(content);
            } else if (data.cols[index].filterWithAnd) {
              return value.every((value: string) => content === value);
            }
          }
        });
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
    <Layout
      props={{
        headerProps: {
          data: data,
          onSearch: handleSearch,
          onFilter: handleFilter,
          chosenValues: chosenValues,
          clearFilters: handleClear,
          searchQuery: searchQuery,
          networkState: networkState,
        },
      }}
    >
      <div className="p-md">
        <p className="font-medium">
          Encontre locais precisando de doações e atendimento voluntário.
        </p>
        <p>Região atendida: Porto Alegre, RS</p>
      </div>
      {rows.length === 0 ? (
        <p className="text-center">Nenhum resultado encontrado.</p>
      ) : (
        <Cards cols={cols} rows={rows} />
      )}
    </Layout>
  );
}

function Cards({ cols, rows }: { cols: Col[]; rows: Row[] }) {
  return (
    <div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 gap-lg">
      {rows.map((row, i) => (
        <Card key={i} cols={cols} row={row} />
      ))}
    </div>
  );
}
