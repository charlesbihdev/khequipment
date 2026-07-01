import { Link } from '@inertiajs/react';
import {
    BadgePercent,
    Boxes,
    FolderKanban,
    LayoutGrid,
    MessageSquareText,
    Tags,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import categories from '@/routes/admin/categories';
import products from '@/routes/admin/products';
import projects from '@/routes/admin/projects';
import promos from '@/routes/admin/promos';
import quotes from '@/routes/admin/quotes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: products.index(),
        icon: Boxes,
    },
    {
        title: 'Categories',
        href: categories.index(),
        icon: Tags,
    },
    {
        title: 'Projects',
        href: projects.index(),
        icon: FolderKanban,
    },
    {
        title: 'Promos',
        href: promos.index(),
        icon: BadgePercent,
    },
    {
        title: 'Quotes',
        href: quotes.index(),
        icon: MessageSquareText,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {footerNavItems.length > 0 && (
                    <NavFooter items={footerNavItems} className="mt-auto" />
                )}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
