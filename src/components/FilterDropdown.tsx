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
  Transition,
} from "@headlessui/react";
import { Roboto } from "next/font/google";
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
  onFilter: (columnIndex: number, values: string[]) => void;
}) {
  if (!col.choices) return null;

  if (!isMultiSelect(col)) {
    return (
      <Field>
        <Label className="block text-white">{col.name}</Label>
        <Select
          className="block w-full rounded p-2 data-[focus]:bg-stone-500 data-[hover]:shadow"
          name={col.name}
          aria-label={col.name}
          value={chosenValues[col.index] || ""}
          onChange={(e) =>
            onFilter(col.index, e.target.value ? [e.target.value] : [])
          }
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
          onChange={(values: string[]) => onFilter(col.index, values)}
          multiple
        >
          <Label className="block text-white">{col.name}</Label>
          <ListboxButton className="flex-row- flex w-full items-center justify-between rounded bg-mbp-light-gray p-2 data-[focus]:bg-stone-500 data-[hover]:shadow">
            <span>{"Selecionar um ou mais"}</span>
            <PiCaretDownBold />
          </ListboxButton>
          <ListboxOptions className="w-full bg-mbp-red-900 p-md">
            {col.choices.sort().map((choice) => (
              <ListboxOption
                key={choice}
                value={choice}
                className="flex cursor-pointer flex-row items-center gap-x-1 bg-white px-2 text-black group-data-[focus]:bg-stone-500"
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
  onFilter: (columnIndex: number, values: string[]) => void;
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

      <Field className="flex items-center justify-between text-white">
        <button
          type="button"
          onClick={() => {
            clearFilters();
            closeMenu();
          }}
          className="text-sm font-medium uppercase hover:underline"
        >
          Limpar Filtros
        </button>
        <button
          type="submit"
          className="rounded-md bg-mbp-green-700 p-md text-sm font-medium uppercase hover:underline"
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
  onFilter: (columnIndex: number, values: string[]) => void;
  chosenValues: Record<number, any>;
  clearFilters: () => void;
}) {
  return (
    <div className="flex justify-center bg-mbp-red-900 p-md text-white">
      <Menu>
        {({ close, open }) => (
          <div className="flex flex-col gap-lg">
            <MenuButton
              className="flex w-full items-center justify-center"
              onClick={close}
            >
              <div className="flex items-center gap-md">
                <p>Filtros de busca</p>
                <PiCaretDownFill
                  className={twMerge(
                    open && "rotate-180",
                    "transition-all ease-in-out",
                  )}
                />
              </div>
            </MenuButton>
            <Transition
              show={open}
              enter="transition-transform duration-500 ease-in-out"
              enterFrom="transform -translate-y-full"
              enterTo="transform translate-y-0"
              leave="transition-transform duration-500 ease-in-out"
              leaveFrom="transform translate-y-0"
              leaveTo="transform -translate-y-full"
            >
              <MenuItems
                anchor="bottom"
                // transition when entering and leaving
                className={`w-full bg-mbp-red-900 p-lg`}
              >
                <Filters
                  data={data}
                  onFilter={onFilter}
                  chosenValues={chosenValues}
                  clearFilters={clearFilters}
                  closeMenu={close}
                />
              </MenuItems>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  );
}
