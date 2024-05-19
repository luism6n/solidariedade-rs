"use client";

import Card from "@/components/Card";
import Layout from "@/components/Layout";
import { useData } from "@/hooks/useData";
import { Col, Row } from "@/types";
import Link from "next/link";
import { PiMapTrifoldFill } from "react-icons/pi";

export default function Home() {
  const {
    data,
    error,
    searchResults,
    networkState,
    searchQuery,
    chosenValues,
    handleSearch,
    handleFilter,
    handleClear,
  } = useData();

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

      <Link
        className="sticky bottom-8 left-1/2 flex max-w-fit -translate-x-1/2 items-center gap-2 rounded-full bg-gray-700 px-4 py-2 text-white shadow-md shadow-mbp-dark-gray"
        href="/map"
      >
        <span className="text-sm font-bold uppercase">Ver Mapa</span>
        <PiMapTrifoldFill size={20} />
      </Link>
    </Layout>
  );
}

function Cards({ cols, rows }: { cols: Col[]; rows: Row[] }) {
  return (
    <div className="grid grid-cols-1 gap-lg laptop:grid-cols-2 desktop:grid-cols-3">
      {rows.map((row, i) => (
        <Card key={i} cols={cols} row={row} />
      ))}
    </div>
  );
}
