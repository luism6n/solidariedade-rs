import Link from "next/link";

export default function TitleLogo() {
  return (
    <Link
      href="/"
      className="font-extrabold desktop:text-xl uppercase text-white"
    >
      <img src="logo.png" alt={process.env.NEXT_PUBLIC_SITE_NAME} aria-description={process.env.NEXT_PUBLIC_SITE_DESC}/>
    </Link>
  );
}
