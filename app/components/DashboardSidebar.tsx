'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
    Bookmark,
    Briefcase,
    FileText,
    Flag,
    LayoutDashboard,
    PlusCircle,
    Search,
    Settings,
    User,
    Users,
    type LucideIcon,
} from "lucide-react"
import Link from "next/link"

type Role = "seeker" | "recruiter" | "admin"

type MenuItem = {
    name: string
    url: string
    icon: LucideIcon
}

const menuItemsByRole: Record<Role, MenuItem[]> = {
    seeker: [
        { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { name: "Browse Jobs", url: "/dashboard/seeker/jobs", icon: Search },
        {
            name: "My Applications",
            url: "/dashboard/seeker/applications",
            icon: FileText,
        },
        { name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
        { name: "Profile", url: "/dashboard/seeker/profile", icon: User },
        { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
    ],
    recruiter: [
        {
            name: "Dashboard",
            url: "/dashboard/recruiter",
            icon: LayoutDashboard,
        },
        {
            name: "Manage Jobs",
            url: "/dashboard/recruiter/jobs",
            icon: Briefcase,
        },
        {
            name: "Add Jobs",
            url: "/dashboard/recruiter/jobs/new",
            icon: PlusCircle,
        },
        {
            name: "Applications",
            url: "/dashboard/recruiter/applications",
            icon: FileText,
        },
        {
            name: "Settings",
            url: "/dashboard/recruiter/settings",
            icon: Settings,
        },
    ],
    admin: [
        { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Users", url: "/dashboard/admin/users", icon: Users },
        { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
        { name: "Reports", url: "/dashboard/admin/reports", icon: Flag },
        { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
    ],
}
export function DashboardSidebar() {
    const { data: session, isPending } = useSession()
    const role = session?.user?.role || 'seeker'
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItemsByRole[role].map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton render={<Link href={item.url} />}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}