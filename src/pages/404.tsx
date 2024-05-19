import { TitleLogo } from "@/components/TitleLogo";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-between">
      <div className="flex w-full items-center justify-center bg-rose-700 p-lg">
        <TitleLogo />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-lg">
        <h1 className="text-3xl">Página não encontrada</h1>
        <Link
          href="/"
          className="text-center text-2xl text-mbp-dark-gray underline"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
