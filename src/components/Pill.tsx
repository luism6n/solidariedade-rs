export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-teal-600 text-white p-sm px-md rounded-full text-sm">
      {children}
    </div>
  );
}
