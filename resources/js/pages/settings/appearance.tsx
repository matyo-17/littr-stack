import Heading from "@/components/heading";
import { Theme, useTheme } from "@/components/theme-provider";
import SettingsLayout from "@/layouts/settings-layout";
import { cn } from "@/lib/utils";
import { BreadcrumbItem } from "@/types";
import { LucideIcon, Monitor, Moon, Sun } from "lucide-react";

type AppearanceTab = {
    value: Theme;
    icon: LucideIcon;
    label: string;
};

export default function Appearance() {
    const { theme, setTheme } = useTheme();

    const tabs: AppearanceTab[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <SettingsLayout>
            <Heading title="Appearance" size="sm" />

            <div className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
                {tabs.map(({ value, icon: Icon, label }) => (
                    <button
                        key={value}
                        onClick={() => setTheme(value)}
                        className={cn(
                            'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                            theme === value
                                ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                        )}
                    >
                        <Icon className="-ml-1 h-4 w-4" />
                        <span className="ml-1.5 text-sm">{label}</span>
                    </button>
                ))}
            </div>
        </SettingsLayout>
    );
}

Appearance.breadcrumbs = [
    {
        title: 'Appearance Settings',
        href: route('appearance'),
    },
] as BreadcrumbItem[];
