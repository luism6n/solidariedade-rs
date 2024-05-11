import Link from "next/link";

export default function TitleLogo() {
  return (
    <Link
      href="/"
      className="font-extrabold desktop:text-xl uppercase text-white"
    >
      <h1 className="p-1">Campanha Popular de Solidariedade</h1>
      <h2 className="bg-stone-700 max-w-fit p-1 rounded-md">
        Rio Grande do Sul
      </h2>
    </Link>
  );
}
