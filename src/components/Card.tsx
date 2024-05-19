import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="border-card flex flex-col gap-lg rounded-md bg-white p-md">
      {children}
    </div>
  );
}
