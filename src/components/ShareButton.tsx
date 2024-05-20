import { useState } from "react";
import { FaArrowTurnDown } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

export default function ShareButton({
  url,
  title,
  text,
  className,
}: {
  url: string;
  title?: string;
  text?: string;
  className?: string;
}) {
  const isSupported =
    navigator.share !== undefined &&
    navigator.canShare !== undefined &&
    navigator.canShare();

  const [message, setMessage] = useState("Compartilhar");

  className = twMerge("flex items-center justify-center gap-4", className);

  if (!isSupported) {
    return (
      <button
        className={className}
        onClick={() => {
          navigator.clipboard.writeText(url);
          setMessage("Link copiado!");
          setTimeout(() => setMessage("Compartilhar"), 1000);
        }}
      >
        <FaArrowTurnDown className="-rotate-90 transform" />

        <span>{message}</span>
      </button>
    );
  }

  return (
    <button
      className={className}
      onClick={() => navigator.share({ title, text, url })}
    >
      <span>{message}</span>
    </button>
  );
}
