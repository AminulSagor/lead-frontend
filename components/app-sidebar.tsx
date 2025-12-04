'use client';
import { Calendar, Home, Inbox, LogOut, Search, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { logout } from '@/actions/logout';
import { Button } from './ui/button';

// Menu items.
const items = [
  {
    title: 'B2B Leads',
    url: '/b2b-leads',
    icon: Inbox,
  },
  {
    title: 'B2C Leads',
    url: '/b2c-leads',
    icon: Search,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-16 flex justify-center text-lg font-semibold">
        <Link href={'/'}>Lead Flow</Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                // Correct and safe active logic
                const isActive =
                  pathname === item.url || pathname.startsWith(`${item.url}/`);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn({
                        'bg-sidebar-accent text-sidebar-accent-foreground':
                          isActive,
                      })}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <form action={logout}>
          <Button
            type="submit"
            variant={'outline'}
            className="w-full hover:cursor-pointer"
          >
            <LogOut />
            Logout
          </Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
