import { createServerClient } from "@/utils/supabase/server"
import { appConfig } from "@/lib/config"
import { getUserProfile } from "@/utils/utils"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  let { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    console.error('AuthenticationLayout: No user found - middleware should prevent this')
    return <div>Authentication error. Please try logging in again.</div>
  }

  const profile = await getUserProfile(supabase, user.id)
  
  let isAdmin = false
  if (user) {
    isAdmin = profile?.role === 'admin'
  }

  if (appConfig.isDemoMode) {
    user = {
      ...user,
      email: 'demo@thereyesvault.com'
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar isAdmin={isAdmin} user={user} profile={profile} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}