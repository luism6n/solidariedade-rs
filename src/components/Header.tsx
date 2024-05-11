import { PiCaretDownFill, PiInfo, PiMagnifyingGlassBold } from "react-icons/pi";

export default function Header() {
  return (
    <header className="w-full sticky top-0">
      <div className="p-md laptop:p-lg bg-rose-700 flex flex-col gap-md laptop:gap-lg">
        <div className="w-full flex justify-between items-center">
          <div className="font-extrabold desktop:text-xl uppercase w-full text-white">
            <h1 className="p-1">Campanha Popular de Solidariedade</h1>
            <h2 className="bg-stone-700 max-w-fit p-1 rounded-md">
              Rio Grande do Sul
            </h2>
          </div>
          <PiInfo className="text-4xl" color="white" />
        </div>
        <div className="bg-white flex gap-md rounded-md p-md items-center">
          <input
            type="text"
            className="w-full"
            placeholder="Buscar por abrigo ou endereço"
          />
          <button type="submit" aria-label="Buscar">
            <PiMagnifyingGlassBold className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex gap-lg justify-center bg-stone-700 text-white p-md items-center">
        <p>Filtros de busca</p>
        <PiCaretDownFill />
      </div>
    </header>
  );
}
