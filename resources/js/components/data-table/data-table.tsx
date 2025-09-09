import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useEffect, useState } from "react";
import { DataTableTable } from "./data-table-table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Paginated } from "@/types";
import qs from "qs";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    endpoint: string;
    render: number;
    sort: string;
    direction?: string;
    perPage?: number;
    children?: ReactNode;
}

export function DataTable<TData, TValue>({
    columns,
    endpoint,
    render,
    sort,
    direction = 'asc',
    perPage = 10,
    children,
}: DataTableProps<TData, TValue>) {
    const initialPagination: PaginationState = {
        pageIndex: 0,
        pageSize: perPage,
    };
    const [pagination, setPagination] = useState<PaginationState>(initialPagination);
    
    const initialSorting: SortingState = [{
        id: sort,
        desc: direction === 'desc'
    }];
    const [sorting, setSorting] = useState<SortingState>(initialSorting);

    const initialColumnFilters: ColumnFiltersState = [];
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialColumnFilters);

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<TData[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);

    useEffect(() => {
        setPagination((prev) => ({
            ...prev,
            pageIndex: 0,
        }));
    }, [sorting, columnFilters]);

    useEffect(() => {
        const handler = setTimeout(() => {
            const fetchData = async () => {
                const params = qs.stringify({
                    page: pagination.pageIndex + 1,
                    per_page: pagination.pageSize,
                    sort: sorting[0]?.id,
                    direction: sorting[0]?.desc ? 'desc' : 'asc',
                    filters: Object.fromEntries(columnFilters.map(({ id, value }) => [id, value])),
                });

                setLoading(true);
                try {
                    const res = await fetch(`${endpoint}?${params.toString()}`);
                    if (!res.ok) {
                        throw new Error(res.statusText);
                    }

                    const json: Paginated<TData> = await res.json();
        
                    setData(json.data);
                    setPageCount(json.last_page);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setData([]);
                    setPageCount(0);
                } finally {
                    setLoading(false);
                }
            }
    
            fetchData();
        }, 300);

        return () => clearTimeout(handler);
    }, [endpoint, render, pagination, sorting, columnFilters]);

    const table = useReactTable<TData>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            pagination,
            sorting,
            columnFilters,
        },

        pageCount: pageCount,
        manualPagination: true,
        onPaginationChange: (updater) => {
            const newPagination = updater instanceof Function ? updater(pagination) : updater;
            setPagination(newPagination);
        },

        manualSorting: true,
        onSortingChange: (updater) => {
            const newSorting = updater instanceof Function ? updater(sorting) : updater;
            setSorting(newSorting);
        },

        manualFiltering: true,
        onColumnFiltersChange: (updater) => {
            const newColumnFilter = updater instanceof Function ? updater(columnFilters) : updater;
            setColumnFilters(newColumnFilter);
        },
    });

    return (
        <div className="grid gap-3">
            <DataTableToolbar table={table}>
                {children}
            </DataTableToolbar>

            <DataTableTable
                table={table}
                loading={loading}
                columns={columns}
            />

            <DataTablePagination table={table} />
        </div>
    )
}