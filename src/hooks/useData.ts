import { NetworkState } from "@/components/Header";
import { Cell, Row, Sheet } from "@/types";
import { useCallback, useEffect, useState } from "react";

export function useData() {
  const [data, setData] = useState<Sheet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Sheet | null>(null);
  const [networkState, setNetworkState] = useState<NetworkState>({
    online: true,
    lastFetchTime: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  // column index -> chosen values
  const [chosenValues, setChosenValues] = useState<Record<number, string[]>>(
    {},
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
    },
    [setSearchQuery],
  );

  const handleFilter = useCallback(
    (colIndex: number, choices: string[]) => {
      setChosenValues((prev) => ({
        ...prev,
        [colIndex]: choices,
      }));
    },
    [setChosenValues],
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
          res,
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

      sheetData.rows.sort(mostRecentRowFirst);

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
            normalizeCellForComparison(cell.content).includes(normalizedQuery),
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

          const values = chosenValues[index];
          const cellContent = cell.content;

          if (!values || values.length === 0) {
            return true;
          }

          if (!cellContent || typeof cellContent === "number") {
            return false;
          }

          let contentArray: string[] = [];
          if (!Array.isArray(cellContent)) {
            contentArray = [cellContent];
          } else {
            contentArray = cellContent;
          }

          if (data.cols[index].filterWithAnd) {
            return values.every((value: string) =>
              contentArray.includes(value),
            );
          } else {
            return values.some((value: string) => contentArray.includes(value));
          }
        });
      }),
    };

    setSearchResults(filteredData);
  }, [chosenValues, data, setSearchResults, searchQuery, setChosenValues]);

  return {
    data,
    error,
    searchResults,
    networkState,
    searchQuery,
    chosenValues,
    handleSearch,
    handleFilter,
    handleClear,
  };
}

function normalizeCellForComparison(content: Cell["content"]) {
  if (content === null) return "";
  return content
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function mostRecentRowFirst(a: Row, b: Row) {
  function rowLastUpdatedAt(row: Row) {
    return Math.max(
      ...row.cells.map((cell) => new Date(cell.updatedAt || 0).getTime()),
    );
  }

  return rowLastUpdatedAt(b) - rowLastUpdatedAt(a);
}
