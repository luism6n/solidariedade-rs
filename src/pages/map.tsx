import { BackButton } from "@/components/BackButton";
import { FilterDropdown } from "@/components/FilterDropdown";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { SearchBar } from "@/components/SearchBar";
import { Spinner } from "@/components/Spinner";
import { useData } from "@/hooks/useData";

export default function MapPage() {
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
    return <Spinner />;
  }

  return (
    <div className="flex h-screen flex-col bg-mbp-light-gray">
      <Header>
        <BackButton />

        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />

        <FilterDropdown
          data={data}
          onFilter={handleFilter}
          chosenValues={chosenValues}
          clearFilters={handleClear}
        />
      </Header>

      <Map data={searchResults || data} />
    </div>
  );
}
