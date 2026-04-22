import { cn } from "@/lib/utils";
import { type FC, type ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export const SectionContainer: FC<SectionContainerProps> = ({
  children,
  id,
  className,
}) => {
  return (
    <section id={id} className={cn("py-24 scroll-mt-20", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};
