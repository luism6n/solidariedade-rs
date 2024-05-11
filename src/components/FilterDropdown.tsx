import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { PiCaretDownFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

import { Field, Fieldset, Input, Label, Select } from "@headlessui/react";

function Filters() {
  return (
    <Fieldset className="flex flex-col gap-lg">
      {/* <Legend className="text-lg font-bold text-white">Legend</Legend> */}
      <Field>
        <Label className="block text-white">Zona</Label>
        <Input className="w-full block" name="zona" />
      </Field>
      <Field>
        <Label className="block text-white">Municipio</Label>
        <Input className="w-full block" name="municipio" />
      </Field>
      <Field>
        <Label className="block text-white">Abrigo</Label>
        <Input className="w-full block" name="abrigo" />
      </Field>
      <Field>
        <Label className="block text-white">Pontos de Coleta</Label>
        <Input className="w-full block" name="abrigo" />
      </Field>
      <Field>
        <Label className="block text-white">Voluntários</Label>
        <Select
          className="w-full block data-[hover]:shadow data-[focus]:bg-stone-500"
          name="voluntarios"
          aria-label="Voluntários"
        >
          <option value="">Buscando Voluntarios</option>
          <option value="">Lotado</option>
        </Select>
      </Field>

      {/* <Field>
        <Label className="block text-white">Country</Label>
        <Select className="w-full block" name="country">
          <option>Canada</option>
          <option>Mexico</option>
          <option>United States</option>
        </Select>
      </Field>
      <Field>
        <Label className="block text-white">Delivery notes</Label>
        <Textarea className="w-full block" name="notes" />
      </Field> */}
    </Fieldset>
  );
}

export default function FilterDropdown() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex w-full justify-center bg-stone-700 text-white p-md">
      <Menu>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
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
