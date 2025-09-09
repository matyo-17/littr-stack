import Heading from "@/components/heading";
import { useFormSheet, usePermissions } from "@/hooks";
import { BreadcrumbItem, Endpoints, Permission, Role } from "@/types";
import { DataTable } from "@/components/data-table";
import CreateButton from "@/components/create-button";
import { ConfirmDelete } from "@/components/confirm-delete";
import RoleSheet from "./partials/sheet";
import getRoleColumns from "./partials/columns";
import { useMemo } from "react";

type RoleForm = {
    name: string;
    permissions: string[];
}

interface RoleIndexProps {
    permissions: Record<string, Record<string, string>>;
}

export default function RoleIndex({ permissions }: RoleIndexProps) {
    const { can } = usePermissions();

    const endpoints: Endpoints = {
        datatable: route('roles.datatable'),
        store: route('roles.store'),
        show: route('roles.show', { role: ':id' }),
        update: route('roles.update', { role: ':id' }),
        delete: route('roles.destroy', { role: ':id' }),
    }

    const initialData: RoleForm = {
        name: '',
        permissions: [],
    };

    const transform = (res: Role): RoleForm => ({
        name: res.name,
        permissions: (res.permissions ?? []).map((role: Permission) => String(role.id)),
    });

    const {
        data, setData, processing, errors,
        sheetAction, resetSheetAction,
        create, edit, confirmDelete,
        submit, render
    } = useFormSheet({ endpoints, initialData, transform });

    const columns = useMemo(
        () => getRoleColumns({ edit, confirmDelete }),
        [edit, confirmDelete]
    );

    return (
        <>
            <Heading title="Roles" />

            <DataTable
                columns={columns}
                endpoint={endpoints.datatable}
                render={render}
                sort="name"
                direction="asc"
                perPage={10}
            >
                {can('create-role') && <CreateButton create={create} />}
            </DataTable>

            <RoleSheet
                action={sheetAction}
                onOpenChange={resetSheetAction}
                data={data}
                setData={setData}
                submit={submit}
                processing={processing}
                errors={errors}
                permissions={permissions}
            />

            <ConfirmDelete
                action={sheetAction}
                onOpenChange={resetSheetAction}
                submit={submit}
                processing={processing}
            />
        </>
    );
}

RoleIndex.breadcrumbs = [
    {
        title: 'Roles',
        href: route('roles.index'),
    }
] as BreadcrumbItem[];
