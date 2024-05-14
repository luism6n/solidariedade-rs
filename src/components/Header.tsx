import { Cell, Sheet } from "@/types";
import { useState } from "react";
import { PiInfo, PiMagnifyingGlassBold } from "react-icons/pi";
import TitleLogo from "./TitleLogo";
import FilterDropdown from "./FilterDropdown";

function normalizeCellForComparison(content: Cell["content"]) {
  if (content === null) return "";
  return content
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export interface NetworkState {
  online: boolean;
  lastFetchTime: Date | null;
}

interface HeaderProps {
  data: Sheet;
  setSearchResults: (filteredData: Sheet) => void;
  networkState: NetworkState;
}

export default function Header({
  data,
  setSearchResults,
  networkState,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    const normalizedQuery = normalizeCellForComparison(value);
    if (normalizedQuery.trim() !== "") {
      const filteredData: Sheet = {
        ...data,
        rows: data.rows.filter((row) => {
          return row?.cells.some((cell) =>
            normalizeCellForComparison(cell.content).includes(normalizedQuery)
          );
        }),
      };

      setSearchResults(filteredData);
    } else {
      setSearchResults(data);
    }
    setSearchQuery(value);
  };

  return (
    <header className="w-full sticky top-0">
      <div className="p-lg laptop:p-lg bg-green flex flex-col gap-md laptop:gap-lg">
        <div className="w-full flex justify-between items-end">
          <TitleLogo />
          <PiInfo className="text-4xl" color="white" />
        </div>
        <form
          className="bg-white flex gap-md rounded-md p-md items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="w-full"
            placeholder="Buscar por abrigo, cidade, bairro..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <PiMagnifyingGlassBold className="text-2xl text-stone-700" />
          </button>
        </form>
      </div>

      <FilterDropdown data={data} setSearchResults={setSearchResults} />

      {!networkState.online && networkState.lastFetchTime && (
        <div className="p-sm bg-stone-200">
          <p className="text-sm text-rose-500">
            Você está offline. Último dado carregado em{" "}
            {networkState.lastFetchTime.toLocaleTimeString()}
          </p>
        </div>
      )}
    </header>
  );
}
