import { Table } from "@tanstack/react-table";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
    table: Table<TData>,
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    const pageSizeOptions = [10, 25, 50, 100];

    return (
        <div className="flex flex-col-reverse md:flex-row gap-2 justify-between">
            <div className="flex items-center justify-center space-x-2">
                <p className="whitespace-nowrap font-medium text-sm">Rows per page</p>
                <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value));
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {pageSizeOptions.map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center justify-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeft />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft />
                </Button>

                <Select 
                    value={String(table.getState().pagination.pageIndex)}
                    onValueChange={e => {
                        const page = e ? Number(e) : 0;
                        table.setPageIndex(page);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Page" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: table.getPageCount() }, (_, i) => (
                            <SelectItem key={`Page ${i+1}`} value={String(i)}>
                                Page {i+1}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRight />
                </Button>
            </div>
        </div>
    );
}
