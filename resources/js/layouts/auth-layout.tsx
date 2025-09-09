import { ThemeProvider } from "@/components/theme-provider";
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";

interface AuthLayoutProps {
    children: React.ReactNode,
    title: string,
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
    const { appIcon } = usePage<SharedData>().props;

    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link href={route('index')} className="flex flex-col items-center gap-2 font-medium">
                                <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                    <img src={appIcon} />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">{title}</h1>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}