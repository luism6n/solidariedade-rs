import { Sheet } from "@/types";
import {
  Field,
  Fieldset,
  Label,
  Menu,
  MenuButton,
  MenuItems,
  Select,
} from "@headlessui/react";
import { Roboto } from "next/font/google";
import { useState } from "react";
import { PiCaretDownFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

function Filters({
  data,
  chosenValues,
  onFilter,
  closeMenu,
  clearFilters,
}: {
  data: Sheet;
  chosenValues: Record<number, any>;
  onFilter: (columnIndex: number, value: any) => void;
  closeMenu: () => void;
  clearFilters: () => void;
}) {
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
                onChange={(e) => onFilter(col.index, e.target.value)}
              >
                <option value="" color="#FFF">
                  Selecionar
                </option>
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
          className="bg-mbp-green-700 p-md rounded-md uppercase hover:underline text-sm font-medium"
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
  onFilter,
  chosenValues,
  clearFilters,
}: {
  data: Sheet;
  onFilter: (columnIndex: number, value: any) => void;
  chosenValues: Record<number, any>;
  clearFilters: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex w-full justify-center bg-mbp-red-900 text-white p-md">
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
            <MenuItems anchor="bottom" className="bg-mbp-red-900 p-lg w-full">
              <Filters
                data={data}
                onFilter={onFilter}
                chosenValues={chosenValues}
                clearFilters={clearFilters}
                closeMenu={close}
              />
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  );
}
