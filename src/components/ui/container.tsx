import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("mx-auto min-w-0 w-full max-w-content px-gutter", className)}
    >
      {children}
    </Component>
  );
}
