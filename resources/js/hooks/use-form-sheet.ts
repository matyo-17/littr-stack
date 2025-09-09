import { Endpoints, SheetAction } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useCallback, useState } from "react"

interface UseCrudProps<TData> {
    endpoints: Endpoints;
    initialData: Record<string, any>;
    transform: (res: TData) => Record<string, any>;
}

export function useFormSheet<TData>({
    endpoints,
    initialData,
    transform,
}: UseCrudProps<TData>) {
    const { data, setData, post, patch, delete: destroy, processing, errors } = useForm(initialData);
    const [sheetAction, setSheetAction] = useState<SheetAction>('');
    const [id, setId] = useState<string>('');
    const [render, setRender] = useState<number>(0);

    const resetSheetAction = useCallback(() => {
        setData(initialData);
        setId('');
        setSheetAction('');
    }, [initialData]);

    const create = useCallback(() => {
        if (!endpoints.store) return;

        setData(initialData);
        setSheetAction('store');
    }, [endpoints, initialData]);

    const edit = useCallback(async (id: string) => {
        if (!endpoints.show || !endpoints.update) return;

        setData(initialData);
        try {
            const res = await fetch(endpoints.show.replace(':id', id));
            if (!res.ok) throw new Error(res.statusText);

            const data = await res.json();
            const transformed = transform(data);

            setData(transformed);
            setId(String(data.id))
            setSheetAction('update');
        } catch (error) {
            console.error("Error fetching data:", error);
            resetSheetAction();
        }
    }, [endpoints, initialData, transform]);

    const confirmDelete = useCallback((id: string) => {
        if (!endpoints.delete) return;

        setData(initialData);
        setSheetAction('delete');
        setId(id);
    }, [endpoints, initialData]);

    const formOptions = {
        onSuccess: () => {
            setRender(prev => prev + 1);
            resetSheetAction();
        }
    };

    const store = () => {
        const url = endpoints.store ?? "";
        if (!url) return;

        post(url, formOptions);
    }

    const update = () => {
        const url = endpoints.update ?? "";
        if (!url) return;

        patch(url.replace(':id', id), formOptions);
    }

    const softDelete = () => {
        const url = endpoints.delete ?? "";
        if (!url) return;

        destroy(url.replace(':id', id), formOptions);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (sheetAction) {
            case 'store':
                store();
                break;

            case 'update':
                update();
                break;

            case 'delete':
                softDelete();
                break;
        }
    }

    return {
        data, setData, processing, errors,
        sheetAction, resetSheetAction,
        create, edit, confirmDelete,
        submit, render
    }
}
