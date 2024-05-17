export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-mbp-green-700 text-white p-sm px-md rounded-full text-sm truncate">
      {children}
    </div>
  );
}
