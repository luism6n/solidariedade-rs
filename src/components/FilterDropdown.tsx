import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { PiCaretDownFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { Roboto } from "next/font/google";
import { Field, Fieldset, Label, Select } from "@headlessui/react";
import { Sheet } from "@/types";

const roboto = Roboto({ subsets: ['latin'], weight: ["400", "500", "700"] });

function Filters({
  data,
  setSearchResults,
  closeMenu,
}: {
  data: Sheet;
  setSearchResults: (filteredData: Sheet) => void;
  closeMenu: () => void;
}) {
  const [chosenValues, setChosenValues] = useState<Record<number, any>>({});

  function filterByChoice(colIndex: number, choice: string) {
    setChosenValues((prev) => ({
      ...prev,
      [colIndex]: choice,
    }));
  }

  function clearFilters() {
    setSearchResults(data);
    setChosenValues({});
  }

  useEffect(() => {
    const filteredData: Sheet = {
      ...data,
      rows: data.rows.filter((row) => {
        return row.cells.every(
          (cell, index) =>
            chosenValues[index] === undefined ||
            cell.content === chosenValues[index]
        );
      }),
    };

    setSearchResults(filteredData);
  }, [chosenValues, data, setSearchResults]);

  return (
    <Fieldset className={"flex flex-col gap-lg " + roboto.className}>
      {data.cols.map(
        (col) =>
          col.choices && (
            <Field key={`${col.name}-${col.index}`}>
              <Label className="block text-white">{col.name}</Label>
              <Select
                className="w-full block rounded p-2 data-[hover]:shadow data-[focus]:bg-stone-500"
                name={col.name}
                aria-label={col.name}
                value={chosenValues[col.index] || ""}
                onChange={(e) => filterByChoice(col.index, e.target.value)}
              >
                <option value="" color="#FFF">Selecionar</option>
                {col.choices.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </Select>
            </Field>
          )
      )}

      <Field className="flex justify-between items-center text-white">
        <button
          type="button"
          onClick={clearFilters}
          className="uppercase hover:underline text-sm font-medium"
        >
          Limpar Filtros
        </button>
        <button
          type="submit"
          className="bg-green p-md rounded-md uppercase hover:underline text-sm font-medium"
          onClick={closeMenu}
        >
          Filtrar
        </button>
      </Field>
    </Fieldset>
  );
}

export default function FilterDropdown({
  data,
  setSearchResults,
}: {
  data: Sheet;
  setSearchResults: (filteredData: Sheet) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex w-full justify-center bg-wine text-white p-md">
      <Menu>
        {({ close }) => (
          <>
            <MenuButton
              className="w-full flex justify-center items-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="flex gap-md items-center">
                <p>Filtros de busca</p>
                <PiCaretDownFill
                  className={twMerge(
                    menuOpen && "rotate-180",
                    "transition-all ease-in-out"
                  )}
                />
              </div>
            </MenuButton>
            <MenuItems anchor="bottom" className="bg-wine p-lg w-full">
              <Filters
                data={data}
                setSearchResults={setSearchResults}
                closeMenu={close}
              />
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  );
}
