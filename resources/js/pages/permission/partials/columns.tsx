import { DataTableCellAction, DataTableColumnHeader } from "@/components/data-table";
import { usePermissions } from "@/hooks";
import { ColumnProps, Permission } from "@/types";
import { ColumnDef, Row } from "@tanstack/react-table";

interface PermissionColumnProps extends ColumnProps {}

export default function getPermissionColumns({
    edit,
    confirmDelete
}: PermissionColumnProps): ColumnDef<Permission>[] {
    const { can, canany } = usePermissions();

    let columns: ColumnDef<Permission>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="name" />
            ),
            meta: {
                label: "Name",
                variant: "text",
            },
            enableColumnFilter: true,
        },
        {
            accessorKey: "group",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="group" />
            ),
            meta: {
                label: "Group",
                variant: "text",
            },
            enableColumnFilter: true,
        },
    ];

    if (canany(['update-permission', 'delete-permission'])) {
        const action: ColumnDef<Permission> = {
            accessorKey: "id",
            enableSorting: false,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="action" />
            ),
            cell: function Cell({ row }: { row: Row<Permission> }) {
                const id = row.original.id;
                return (
                    <DataTableCellAction
                        canUpdate={can('update-permission')}
                        edit={() => edit?.(id)}
                        canDelete={can('delete-permission')}
                        confirmDelete={() => confirmDelete?.(id)}
                    />
                )
            }
        }
        columns.push(action);
    }

    return columns;
}
