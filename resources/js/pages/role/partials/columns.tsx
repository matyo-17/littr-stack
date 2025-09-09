import { DataTableCellAction, DataTableColumnHeader } from "@/components/data-table";
import { usePermissions } from "@/hooks";
import { ColumnProps, Role } from "@/types";
import { ColumnDef, Row } from "@tanstack/react-table";

interface RoleColumnProps extends ColumnProps {}

export default function getRoleColumns({
    edit,
    confirmDelete
}: RoleColumnProps): ColumnDef<Role>[] {
    const { can, canany } = usePermissions();

    let columns: ColumnDef<Role>[] = [
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
            accessorKey: "permissions_count",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="permissions" />
            ),
        },
    ];

    if (canany(['update-role', 'delete-role'])) {
        const action: ColumnDef<Role> = {
            accessorKey: "id",
            enableSorting: false,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="action" />
            ),
            cell: function Cell({ row }: { row: Row<Role> }) {
                const id = row.original.id;
                return (
                    <DataTableCellAction
                        canUpdate={can('update-role')}
                        edit={() => edit?.(id)}
                        canDelete={can('delete-role')}
                        confirmDelete={() => confirmDelete?.(id)}
                    />
                )
            }
        }
        columns.push(action);
    }

    return columns;
}
