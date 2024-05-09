"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { PiInfo, PiMagnifyingGlassBold } from "react-icons/pi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/sheet");

      if (res.status === 200) {
        setData(await res.json());
      } else {
        setError(`${res.status} ${res.statusText}`);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>loading...</p>;
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <header className="p-lg bg-rose-700 w-full flex flex-col gap-lg">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-xl uppercase w-full text-white">
            <h1>Solidariedade</h1>
            <h2 className="bg-gray-700 max-w-fit p-1 rounded-md">
              Rio Grande do Sul
            </h2>
          </div>
          <PiInfo className="text-4xl" color="white" />
        </div>
        <div className="bg-white flex gap-md p-md items-center">
          <input type="text" className="w-full" />
          <PiMagnifyingGlassBold className="text-2xl" />
        </div>
      </header>

      <pre className="max-w-md">{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
