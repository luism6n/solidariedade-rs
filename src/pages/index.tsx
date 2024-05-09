import { Inter } from "next/font/google";
import { PiInfo, PiMagnifyingGlassBold } from "react-icons/pi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-lg ${inter.className}`}
    >
      <header className="p-md bg-rose-700 w-full flex flex-col gap-lg">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-xl uppercase w-full">
            <h1>Solidariedade</h1>
            <h2 className="bg-gray-700 max-w-fit p-1 rounded-md">
              Rio Grande do Sul
            </h2>
          </div>
          <PiInfo className="text-4xl" />
        </div>
        <div className="bg-white flex gap-md p-md items-center">
          <input type="text" className="w-full text-black" />
          <PiMagnifyingGlassBold className="text-2xl text-black" />
        </div>
      </header>
    </main>
  );
}
