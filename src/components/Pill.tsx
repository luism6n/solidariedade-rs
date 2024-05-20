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
        "truncate rounded-full bg-mbp-green-700 p-sm px-md text-sm text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
