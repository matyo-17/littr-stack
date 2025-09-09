import { NavItem, NavSubItem } from "@/types";
import { LayoutGrid, Shield, Users } from "lucide-react";
import { usePermissions } from "./use-permissions";

export function useNavItems() {
    const { can } = usePermissions();

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
            icon: LayoutGrid,
        },
    ];
    
    const rolesAndPermissions: NavItem | null = rolesAndPermissionsNavItem(can);
    if (rolesAndPermissions) {
        mainNavItems.push(rolesAndPermissions);
    }

    if (can('view-user')) {
        mainNavItems.push({
            title: 'Users',
            href: route('users.index'),
            icon: Users,
        });
    }

    return {
        mainNavItems,
    };
}

type canFn = (permission: string) => boolean;

function rolesAndPermissionsNavItem(can: canFn): NavItem | null {
    const items: NavSubItem[] = [];
    if (can('view-role')) {
        items.push({
            title: 'Roles',
            href: route('roles.index')
        });
    }

    if (can('view-permission')) {
        items.push({
            title: 'Permissions',
            href: route('permissions.index')
        });
    }

    if (items.length === 0) return null;

    return {
        title: 'Roles & Permissions',
        href: '#',
        icon: Shield,
        items: items,
    };
}
