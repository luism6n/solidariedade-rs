import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { PiCaretDownFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

import { Field, Fieldset, Input, Label, Select } from "@headlessui/react";

function Filters() {
  const [zona, setZona] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [abrigo, setAbrigo] = useState("");

  const clearFilters = () => {
    setZona("");
    setMunicipio("");
    setAbrigo("");
  };

  return (
    <Fieldset className="flex flex-col gap-lg">
      <Field>
        <Label className="block text-white">Zona</Label>
        <Input
          className="w-full block"
          name="zona"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
        />
      </Field>
      <Field>
        <Label className="block text-white">Municipio</Label>
        <Input
          className="w-full block"
          name="municipio"
          value={municipio}
          onChange={(e) => setMunicipio(e.target.value)}
        />
      </Field>
      <Field>
        <Label className="block text-white">Abrigo</Label>
        <Input
          className="w-full block"
          name="abrigo"
          value={abrigo}
          onChange={(e) => setAbrigo(e.target.value)}
        />
      </Field>
      <Field>
        <Label className="block text-white">Voluntários</Label>
        <Select
          className="w-full block data-[hover]:shadow data-[focus]:bg-stone-500"
          name="voluntarios"
          aria-label="Voluntários"
        >
          <option value="">Buscando Voluntários</option>
          <option value="">Lotado</option>
        </Select>
      </Field>
      <Field className="flex justify-between items-center text-white">
        <button
          type="button"
          onClick={clearFilters}
          className="uppercase hover:underline"
        >
          Limpar Filtros
        </button>
        <button
          type="submit"
          className="bg-teal-600 p-md rounded-md uppercase hover:underline"
        >
          Filtrar
        </button>
      </Field>
    </Fieldset>
  );
}

export default function FilterDropdown() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex w-full justify-center bg-stone-700 text-white p-md">
      <Menu>
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
        <MenuItems anchor="bottom" className="bg-stone-700 p-lg w-full">
          <Filters />
        </MenuItems>
      </Menu>
    </div>
  );
}
