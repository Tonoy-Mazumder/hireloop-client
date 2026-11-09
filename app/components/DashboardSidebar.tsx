import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import { Plus } from "lucide-react"

const menuItemsByRole = {
    seeker: [

    ],
    recruiter: [

    ],
    admin: [

    ]
}
export function DashboardSidebar() {
    const { data: session, isPending } = useSession()
    const role = session?.user?.role || 'seeker'
    console.log('user er data from sidebar', session)
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {
                            // menuItemsByRole[role].map((item) => (
                            //     <SidebarMenuItem key={item.name}>
                            //         <SidebarMenuButton render={<a href={item.url} />}>

                            //             <span>{item.name}</span>
                            //         </SidebarMenuButton>
                            //     </SidebarMenuItem>
                            // ))
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}