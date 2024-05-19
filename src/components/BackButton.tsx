// back button for use inside the header

import { useRouter } from "next/router";
import { FaArrowLeftLong } from "react-icons/fa6";

export function BackButton() {
  const router = useRouter();

  return (
    <div className="w-full bg-mbp-green-700 p-lg text-white">
      <button className="flex items-center gap-2" onClick={() => router.back()}>
        <FaArrowLeftLong />
        <span>Voltar</span>
      </button>
    </div>
  );
}
