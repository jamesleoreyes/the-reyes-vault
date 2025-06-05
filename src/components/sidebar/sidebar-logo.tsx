"use client"

import * as React from "react"
import { Vault } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function SidebarLogo() {
  const { state } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex justify-center gap-2 pt-2">
          <Link href='/' className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center">
              <Vault className="size-4" />
            </div>
            {state === 'expanded' && <h1 className="text-2xl font-light">The Reyes Vault</h1>}
          </Link>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
