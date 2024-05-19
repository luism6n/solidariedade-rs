import { Sheet } from "@/types";
import { PiInfo, PiMagnifyingGlassBold } from "react-icons/pi";
import FilterDropdown from "./FilterDropdown";
import TitleLogo from "./TitleLogo";

export interface NetworkState {
  online: boolean;
  lastFetchTime: Date | null;
}

interface HeaderProps {
  data: Sheet;
  searchQuery: string;
  onSearch: (query: string) => void;
  onFilter: (columnIndex: number, value: any) => void;
  chosenValues: Record<number, any>;
  clearFilters: () => void;
  networkState: NetworkState;
}

export default function Header({
  data,
  searchQuery,
  onSearch,
  onFilter,
  chosenValues,
  clearFilters,
  networkState,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full">
      <div className="flex flex-col gap-md bg-mbp-green-700 p-lg laptop:gap-lg laptop:p-lg">
        <div className="flex w-full items-end justify-between">
          <TitleLogo />
          <PiInfo className="text-4xl" color="white" />
        </div>
        <form
          className="flex items-center gap-md rounded-md bg-white p-md"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="w-full"
            placeholder="Buscar por abrigo, cidade, bairro..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <PiMagnifyingGlassBold className="text-2xl text-mbp-dark-gray" />
          </button>
        </form>
      </div>

      <FilterDropdown
        data={data}
        onFilter={onFilter}
        chosenValues={chosenValues}
        clearFilters={clearFilters}
      />

      {/* Show this once online/offline detection works more reliably
      {!networkState.online && networkState.lastFetchTime && (
        <div className="p-sm bg-200">
          <p className="text-sm text-rose-500">
            Você está offline. Último dado carregado em{" "}
            {networkState.lastFetchTime.toLocaleTimeString()}
          </p>
        </div>
      )} */}
    </header>
  );
}
