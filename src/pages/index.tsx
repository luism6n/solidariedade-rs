"use client";

import { Card } from "@/components/Card";
import { CardContent } from "@/components/CardContent";
import { FilterDropdown } from "@/components/FilterDropdown";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { useData } from "@/hooks/useData";
import { Col, Row } from "@/types";
import { getRowId } from "@/utils/rowId";
import Link from "next/link";
import { PiMapTrifoldFill } from "react-icons/pi";

export default function Home() {
  const {
    data,
    error,
    searchResults,
    searchQuery,
    chosenValues,
    handleSearch,
    handleFilter,
    handleClear,
  } = useData();

  if (error) {
    return <p>{error}</p>;
  }

  if (data === null) {
    return <p>Nenhum dado encontrado.</p>;
  } else if (data === undefined) {
    return <p>Carregando...</p>;
  }

  const { cols, rows } = searchResults || data;

  return (
    <>
      <Header>
        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />

        <FilterDropdown
          data={data}
          onFilter={handleFilter}
          chosenValues={chosenValues}
          clearFilters={handleClear}
        />
      </Header>
      <div className="flex flex-1 flex-col gap-md bg-mbp-light-gray p-lg">
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
      </div>
    </>
  );
}

function Cards({ cols, rows }: { cols: Col[]; rows: Row[] }) {
  return (
    <div className="grid grid-cols-1 gap-lg laptop:grid-cols-2 desktop:grid-cols-3">
      {rows.map((row, i) => (
        <Card key={i}>
          <CardContent cols={cols} row={row} />
          <Link
            className="flex justify-center rounded-md border border-mbp-green-700 p-2"
            href={`/places/${getRowId(row, cols)}`}
          >
            <span className="text-xl text-mbp-green-700">Mais informações</span>
          </Link>
        </Card>
      ))}
    </div>
  );
}
