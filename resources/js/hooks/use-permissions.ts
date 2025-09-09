import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { useCallback } from "react";

export function usePermissions() {
    const { auth } = usePage<SharedData>().props;
    
    const permissions = auth.permissions ?? [];;

    const can = useCallback(
        (permission: string) => permissions.includes(permission),
        [permissions]
    );

    const canany = useCallback(
        (permissions: string[]) => permissions.some((permission) => can(permission)),
        [permissions]
    );

    return {
        can,
        canany
    };
}
