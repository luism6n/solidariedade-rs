import { PiMagnifyingGlassBold } from "react-icons/pi";

export function SearchBar({
  searchQuery,
  onSearch,
}: {
  searchQuery: string;
  onSearch: (query: string) => void;
}) {
  return (
    <div className="flex flex-col gap-md bg-mbp-green-700 p-lg laptop:gap-lg laptop:p-lg">
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
  );
}
