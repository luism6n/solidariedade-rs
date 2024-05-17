import { Col, Sheet } from "@/types";
import {
  Field,
  Fieldset,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItems,
  Select,
} from "@headlessui/react";
import { Roboto } from "next/font/google";
import { useState } from "react";
import {
  PiCaretDownBold,
  PiCaretDownFill,
  PiCheckSquareBold,
  PiSquareBold,
} from "react-icons/pi";
import { twMerge } from "tailwind-merge";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

function isMultiSelect(col: Col) {
  return col.filterWithOr || col.filterWithAnd;
}

function FieldFilter({
  col,
  chosenValues,
  onFilter,
}: {
  col: Col;
  chosenValues: Record<number, any>;
  onFilter: (columnIndex: number, value: any) => void;
}) {
  if (!col.choices) return null;

  if (!isMultiSelect(col)) {
    return (
      <Field>
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
    );
  } else {
    return (
      <Field>
        <Listbox
          value={chosenValues[col.index]}
          onChange={(value) => onFilter(col.index, value)}
          multiple
        >
          <Label className="block text-white">{col.name}</Label>
          <ListboxButton className="w-full bg-gray-200 flex flex-row- justify-between items-center rounded p-2 data-[hover]:shadow data-[focus]:bg-stone-500">
            <span>{"Selecionar um ou mais"}</span>
            <PiCaretDownBold />
          </ListboxButton>
          <ListboxOptions className="bg-mbp-red-900 p-md w-full">
            {col.choices.sort().map((choice) => (
              <ListboxOption
                key={choice}
                value={choice}
                className="flex flex-row gap-x-1 items-center cursor-pointer group-data-[focus]:bg-stone-500 px-2 bg-white text-black"
              >
                {({ focus, selected }) => (
                  <>
                    {selected ? (
                      <PiCheckSquareBold className="text-black" />
                    ) : (
                      <PiSquareBold className="text-black" />
                    )}
                    <span>{choice}</span>
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </Field>
    );
  }
}

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
      {data.cols.map((col) => (
        <FieldFilter
          key={`${col.name}-${col.index}`}
          col={col}
          chosenValues={chosenValues}
          onFilter={onFilter}
        />
      ))}

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
    <div className="flex justify-center bg-mbp-red-900 text-white p-md">
      <Menu>
        {({ close }) => (
          <div className="flex flex-col gap-lg">
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
            <MenuItems anchor="bottom" className="w-full bg-mbp-red-900 p-lg">
              <Filters
                data={data}
                onFilter={onFilter}
                chosenValues={chosenValues}
                clearFilters={clearFilters}
                closeMenu={close}
              />
            </MenuItems>
          </div>
        )}
      </Menu>
    </div>
  );
}
