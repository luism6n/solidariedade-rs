import Layout from "@/components/Layout";
import { Map } from "@/components/Map";
import { useData } from "@/hooks/useData";

export default function MapPage() {
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

  return (
    <Layout
      props={{
        headerProps: {
          data,
          onSearch: handleSearch,
          onFilter: handleFilter,
          chosenValues: chosenValues,
          clearFilters: handleClear,
          searchQuery: searchQuery,
          networkState: networkState,
        },
      }}
    >
      <Map data={searchResults || data} />
    </Layout>
  );
}
