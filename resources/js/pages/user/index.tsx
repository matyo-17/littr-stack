import { DataTable } from "@/components/data-table";
import Heading from "@/components/heading";
import { useFormSheet } from "@/hooks";
import { BreadcrumbItem, Endpoints, Role, Selections, User } from "@/types";
import UserSheet from "./partials/sheet";
import getUserColumns from "./partials/columns";

type UserForm = {
    email: string;
    name: string;
    roles: string[];
}

interface UserIndexProps {
    roles: Selections;
}

export default function Index({ roles }: UserIndexProps) {
    const endpoints: Endpoints = {
        datatable: route('users.datatable'),
        show: route('users.show', { user: ':id' }),
        update: route('users.update', { user: ':id' }),
    }

    const initialData: UserForm = {
        email: '',
        name: '',
        roles: [],
    };

    const transform = (res: User): UserForm => ({
        email: res.email,
        name: res.name,
        roles: (res.roles ?? []).map((role: Role) => String(role.id)),
    });

    const {
        data, setData, processing, errors,
        sheetAction, resetSheetAction,
        edit, submit,
        render
    } = useFormSheet({ endpoints, initialData, transform });

    const columns = getUserColumns({ roles, edit });

    return (
        <>
            <Heading title="Users" />

            <DataTable
                columns={columns}
                endpoint={endpoints.datatable}
                render={render}
                sort="group"
                direction="asc"
                perPage={10}
            />

            <UserSheet
                action={sheetAction}
                onOpenChange={resetSheetAction}
                data={data}
                setData={setData}
                submit={submit}
                processing={processing}
                errors={errors}
                roles={roles}
            />
        </>
    )
}

Index.breadcrumbs = [
    {
        title: 'Users',
        href: route('users.index'),
    }
] as BreadcrumbItem[];
