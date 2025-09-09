import { LucideIcon } from "lucide-react";
export * from "./database";
export * from "./datatable";

export interface SharedData {
    appName: string;
    appIcon: string;
    auth: Auth;
    toast: Toast | null;
    [key: string]: unknown;
}

export interface Auth {
    user: User;
    roles: string[];
    permissions: string[];
}

export interface Toast {
    status: 'success' | 'warning' | 'error' | 'info';
    message: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    items?: NavSubItem[]
}

export interface NavSubItem {
    title: string;
    href: string;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface ColumnProps {
    edit?: (id: string) => void;
    confirmDelete?: (id: string) => void;
}

export interface SheetProps {
    action: string;
    onOpenChange: () => void;
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    submit: FormEventHandler;
    processing: boolean;
    errors: Partial<Record<string, string>>;
}

export interface Endpoints {
    show?: string;
    store?: string;
    update?: string;
    delete?: string;
    datatable: string;
}

export type Selections = Record<string, string>[];

export type SheetAction = 'store' | 'update' | 'delete' | '';
