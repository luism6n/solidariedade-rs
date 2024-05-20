import { twMerge } from "tailwind-merge";

export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "max-w-52 truncate rounded-full bg-mbp-green-700 p-sm px-md text-sm text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
