import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="border-card flex flex-col gap-2 rounded-md bg-white p-md">
      {children}
    </div>
  );
}
