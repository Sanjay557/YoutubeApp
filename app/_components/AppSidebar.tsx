import React from 'react'
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
} from "@/components/ui/sidebar"
import { BookType, Calendar, ChartNoAxesColumn, GalleryThumbnails, Gauge, Home, HomeIcon, ImageIcon, Inbox, Lightbulb, Search, Settings, Settings2, Users2 } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    {
        title: "Home",
        url: "#",
        icon: HomeIcon,
    },
    {
        title: "Thumbnail",
        url: "#",
        icon: ImageIcon,
    },
    {
        title: "Thumbnail Search",
        url: "#",
        icon: GalleryThumbnails,
    },
    {
        title: "Keywords",
        url: "#",
        icon: BookType,
    },
    {
        title: "Optimize",
        url: "#",
        icon: ChartNoAxesColumn,
    },
    {
        title: "Outlier",
        url: "#",
        icon: Gauge,
    },
    {
        title: "AI Content Generator",
        url: "#",
        icon: Lightbulb,
    },
    {
        title: "Billing",
        url: "#",
        icon: Settings2,
    },
    {
        title: "Profile",
        url: "#",
        icon: Users2,
    },
]

export function AppSidebar() {
    const path = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    <Image src={'/logo.png'} alt='logo' width={100} height={400}
                        className='w-full' />
                    <h2 className='text-sm text-gray-400 text-center'>Build Awesome</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-1'>
                            {items.map((item, index) => (
                                // <SidebarMenuItem key={item.title} className='p-2'>
                                //     <SidebarMenuButton asChild className=''>
                                <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${path.includes(item.url) && 'bg-gray-200ß'}`}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                                //     </SidebarMenuButton>
                                // </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <h2 className='p-2 text-gray-400 text-sm'>Copyright @Tubeguruji</h2>
            </SidebarFooter>
        </Sidebar>
    )
}