import { DataTableCellAction, DataTableCellList, DataTableColumnHeader } from "@/components/data-table";
import { usePermissions, useMultiselect } from "@/hooks";
import { ColumnProps, Selections, User } from "@/types";
import { ColumnDef, Row } from "@tanstack/react-table";

interface UserColumnProps extends ColumnProps {
    roles: Selections;
}

export default function getUserColumns({
    roles,
    edit,
}: UserColumnProps): ColumnDef<User>[] {
    const { can, canany } = usePermissions();
    const { multiselectOptions } = useMultiselect();

    let columns: ColumnDef<User>[] = [
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
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="email" />
            ),
            meta: {
                label: "Email",
                variant: "text",
            },
            enableColumnFilter: true,
        },
        {
            accessorKey: "roles",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="roles" />
            ),
            cell: function Cell({ row }: { row: Row<User> }) {
                return (
                    <DataTableCellList
                        list={row.original.roles ?? []}
                        field="name"
                    />
                )
            },
            meta: {
                label: "Role",
                variant: "multiSelect",
                options: multiselectOptions(roles, 'name'),
            },
            enableColumnFilter: true,
        },
    ];
        
    if (canany(['update-user'])) {
        const action: ColumnDef<User> = {
            accessorKey: "id",
            enableSorting: false,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="action" />
            ),
            cell: function Cell({ row }: { row: Row<User> }) {
                const id = row.original.id;
                return (
                    <DataTableCellAction
                        canUpdate={can('update-user')}
                        edit={() => edit?.(id)}
                    />
                )
            }
        }
        columns.push(action);
    }

    return columns;
}
