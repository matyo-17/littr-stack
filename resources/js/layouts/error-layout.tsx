import { ThemeProvider } from "@/components/theme-provider";

interface ErrorLayoutProps {
    children: React.ReactNode,
}

export default function ErrorLayout({ children }: ErrorLayoutProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                {children}
            </div>
        </ThemeProvider>
    )
}
