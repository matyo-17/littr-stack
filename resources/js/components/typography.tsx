import { cn } from "@/lib/utils";
import { ReactNode } from "react"

interface TypographyProps {
    children: ReactNode;
    className?: string;
}

export function TypographyH1({ children, className }: TypographyProps) {
    return (
        <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight text-balance", className)}>
            {children}
        </h1>
    )
}

export function TypographyLead({ children, className }: TypographyProps) {
    return (
        <p className={cn("text-muted-foreground text-xl", className)}>
            {children}
        </p>
    )
}

