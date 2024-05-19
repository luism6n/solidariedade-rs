export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="truncate rounded-full bg-mbp-green-700 p-sm px-md text-sm text-white">
      {children}
    </div>
  );
}
