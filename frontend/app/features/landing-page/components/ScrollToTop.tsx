import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { type FC, useEffect, useState } from "react";

export const ScrollToTop: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect((): (() => void) => {
    const toggleVisibility = (): void => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 p-4 bg-[#1e293b] text-white rounded-full shadow-2xl z- transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0",
      )}
    >
      <ChevronUp size={24} />
    </button>
  );
};
