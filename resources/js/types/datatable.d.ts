import { Row, RowData } from "@tanstack/react-table";

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    first_page_url: string;
    prev_page_url: string | null;
    links: PaginatedLinks[];
    next_page_url: string | null;
    last_page_url: string;
    from: number;
    to: number;
    total: number;
}

export interface PaginatedLinks {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Option {
    label: string;
    value: string;
    count?: number;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        label?: string;
        placeholder?: string;
        variant?: "text" | "number" | "select" | "multiSelect";
        options?: Option[];
        range?: [number, number];
        unit?: string;
        icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    }
}