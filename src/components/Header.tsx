import { Cell, Sheet } from "@/types";
import { useState } from "react";
import { PiInfo, PiMagnifyingGlassBold } from "react-icons/pi";

function normalizeCellForComparison(cell: Cell) {
  return cell
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
interface HeaderProps {
  data: Sheet;
  setSearchResults: (filteredData: Sheet) => void;
}

export default function Header({ data, setSearchResults }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    const normalizedQuery = normalizeCellForComparison(value);
    if (normalizedQuery.trim() !== "") {
      const filteredData: Sheet = {
        ...data,
        rows: data.rows.filter((row) => {
          return row?.cells.some(
            (cell) =>
              cell !== null &&
              normalizeCellForComparison(cell).includes(normalizedQuery)
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
      <div className="p-md laptop:p-lg bg-rose-700 flex flex-col gap-md laptop:gap-lg">
        <div className="w-full flex justify-between items-center">
          <div className="font-extrabold desktop:text-xl uppercase w-full text-white">
            <h1 className="p-1">Campanha Popular de Solidariedade</h1>
            <h2 className="bg-stone-700 max-w-fit p-1 rounded-md">
              Rio Grande do Sul
            </h2>
          </div>
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
    </header>
  );
}
