"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"
import { INavMain } from "./app-sidebar"
import Link from "next/link"

export function SidebarMain({ items }: { items: INavMain[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Memories</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
          >
            <Link href={item.url}>
              <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
