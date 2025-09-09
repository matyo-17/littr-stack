import { NavItem } from "@/types";
import {
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useBaseUrl } from "@/hooks";
import { Link } from "@inertiajs/react";

export function SimpleMenuItem({ item }: { item: NavItem }) {
    const currentPath = useBaseUrl();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                isActive={currentPath.startsWith(item.href)}
                tooltip={{ children: item.title }}
                asChild
            >
                <Link href={item.href}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}