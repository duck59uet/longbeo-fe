'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { navItems } from '@/constants/data';
import {
  ChevronRight} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
import useMediaQuery from '@/hooks/useMediaQuery';

export const company = {
  name: 'Dichvumat.com',
  logo: '/dichvumat.png',
  plan: 'App tăng mắt facebook'
};

export default function AppSidebar() {
  // const { data: session } = useSession();
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const collapsible = isDesktop ? 'none' : 'icon';

  return (
    <Sidebar collapsible={collapsible}>
      <SidebarHeader>
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <img src={company.logo} alt="Company Logo" className="size-8" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{company.name}</span>
            <span className="truncate text-xs">{company.plan}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Hệ thống</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                        className='hover:bg-[#ECF2FF]'
                      >
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                              className='hover:bg-[#ECF2FF]'
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className='hover:bg-[#ECF2FF]'
                  >
                    <Link href={item.url}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col items-start bottom-0 gap-3 py-4">
          {/* Zalo */}
          <a
            href="https://zalo.me/g/azthjg861"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 shadow-lg"
          >
            <img
              src="/zalo.webp" // Thay thế bằng đường dẫn icon Zalo
              alt="Zalo"
              className="h-6 w-6"
            />
          </a>
          {/* Messenger */}
          <a
            href="https://m.me/YOUR_MESSENGER_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-lg"
          >
            <img
              src="/messenger.png" // Thay thế bằng đường dẫn icon Messenger
              alt="Messenger"
              className="h-6 w-6"
            />
          </a>
          {/* Call */}
          <a
            href="tel:+0976836223"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 shadow-lg"
          >
            <img
              src="/phone.png" // Thay thế bằng đường dẫn icon Phone
              alt="Call"
              className="h-6 w-6"
            />
          </a>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
