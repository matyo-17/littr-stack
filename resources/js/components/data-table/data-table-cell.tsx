import { Badge } from "@/components/ui/badge";

interface DataTableCellListProps {
    list: Record<string, any>[];
    field: string;
}

export function DataTableCellList({
    list,
    field,
}: DataTableCellListProps) {
    if (!list.length) {
        return (
            <>
                -
            </>
        )
    }
    const children = list.map((item) => (
        <Badge key={item.id}>
            {item[field]}
        </Badge>
    ));

    return (
        <div className="flex flex-wrap justify-center gap-2">
            {children}
        </div>
    );
}
