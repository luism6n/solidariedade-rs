import Link from "next/link";

export default function TitleLogo() {
  return (
    <Link
      href="/"
      className="font-extrabold uppercase text-white desktop:text-xl"
    >
      <img
        src="logo.png"
        alt={process.env.NEXT_PUBLIC_SITE_NAME}
        aria-description={process.env.NEXT_PUBLIC_SITE_DESC}
      />
    </Link>
  );
}
