import { DataTable } from "@/components/data-table";
import Heading from "@/components/heading";
import { BreadcrumbItem, Endpoints, Permission } from "@/types";
import { ConfirmDelete } from "@/components/confirm-delete";
import { useFormSheet, usePermissions } from "@/hooks";
import CreateButton from "@/components/create-button";
import getPermissionColumns from "./partials/columns";
import PermissionSheet from "./partials/sheet";

type PermissionForm = {
    name: string;
    group?: string;
}

export default function Index() {
    const { can } = usePermissions();

    const endpoints: Endpoints = {
        datatable: route('permissions.datatable'),
        store: route('permissions.store'),
        show: route('permissions.show', { permission: ':id' }),
        update: route('permissions.update', { permission: ':id' }),
        delete: route('permissions.destroy', { permission: ':id' }),
    }

    const initialData: PermissionForm = {
        name: '',
        group: '',
    };

    const transform = (res: Permission): PermissionForm => ({
        name: res.name,
        group: res.group,
    });

    const {
        data, setData, processing, errors,
        sheetAction, resetSheetAction,
        create, edit, confirmDelete,
        submit, render
    } = useFormSheet({ endpoints, initialData, transform });

    const columns = getPermissionColumns({ edit, confirmDelete });

    return (
        <>
            <Heading title="Permissions" />

            <DataTable
                columns={columns}
                endpoint={route('permissions.datatable')}
                render={render}
                sort="group"
                direction="asc"
                perPage={10}
            >
                {can('create-permission') && <CreateButton create={create} />}
            </DataTable>

            <PermissionSheet
                action={sheetAction}
                onOpenChange={resetSheetAction}
                data={data}
                setData={setData}
                submit={submit}
                processing={processing}
                errors={errors}
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

Index.breadcrumbs = [
    {
        title: 'Permissions',
        href: route('permissions.index'),
    }
] as BreadcrumbItem[];
