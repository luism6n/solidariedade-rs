import TitleLogo from "@/components/TitleLogo";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-between">
      <div className="w-full bg-rose-700 p-lg flex items-center justify-center">
        <TitleLogo />
      </div>
      <div className="flex gap-lg flex-col flex-1 justify-center items-center">
        <h1 className="text-3xl">Página não encontrada</h1>
        <Link
          href="/"
          className="underline text-2xl text-center text-mbp-dark-gray"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
