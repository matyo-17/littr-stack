import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { BreadcrumbItem, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface AppLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode
}

export default function AppLayout({ breadcrumbs=[], children }: AppLayoutProps) {
    const { toast: toastData } = usePage<SharedData>().props;
    const shownToast = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (!toastData || shownToast.current.has(toastData.id)) return;
        
        const { id, status, message } = toastData;
        const toastMethods = {
            info: toast.info,
            success: toast.success,
            warning: toast.warning,
            error: toast.error,
        };
        const toastFn = toastMethods[status] || toast;

        toastFn(message);

        shownToast.current.add(id);
    }, [toastData]);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger />
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        {children}
                    </div>
                </SidebarInset>

                <Toaster position="top-center" richColors={true} />
            </SidebarProvider>
        </ThemeProvider>
    )
}
