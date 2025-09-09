import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { CollapsibleMenuItem } from '@/components/sidebar/collapsible-menu-item';
import { SimpleMenuItem } from '@/components/sidebar/simple-menu-item';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) =>
                    item.items?.length ? (
                        <CollapsibleMenuItem key={item.title} item={item} />
                    ) : (
                        <SimpleMenuItem key={item.title} item={item} />
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
