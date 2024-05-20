import Image from "next/image";
import Link from "next/link";

export function TitleLogo() {
  return (
    <Link
      href="/"
      className="font-extrabold uppercase text-white desktop:text-xl"
    >
      <Image
        src="/logo.png"
        alt={
          process.env.NEXT_PUBLIC_SITE_NAME ||
          "Logotipo da Campanha Popular da Solidariedade"
        }
        width={272}
        height={117}
        aria-description={process.env.NEXT_PUBLIC_SITE_DESC}
      />
    </Link>
  );
}
