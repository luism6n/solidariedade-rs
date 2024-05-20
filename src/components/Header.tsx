import { PiInfo } from "react-icons/pi";
import { TitleLogo } from "./TitleLogo";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex flex-col gap-md bg-mbp-green-700 p-lg laptop:gap-lg laptop:p-lg">
        <div className="flex w-full items-end justify-between">
          <TitleLogo />
          <PiInfo className="text-4xl" color="white" />
        </div>
      </div>

      {children}
    </header>
  );
}
