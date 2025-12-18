"use client"

import * as React from "react"
import Image from "next/image"
import {
  BookOpen,
  Command,
  Frame,
  Users,
  Tag,
  CreditCard,
  Settings,
} from "lucide-react"
import { useAppDispatch } from "@/redux/hook"
import { loadUser } from "@/redux/actions/userActions"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Kurslar",
      url: "/dashboard/kurslar",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Tüm Kurslar",
          url: "/dashboard/kurslar",
        },
        {
          title: "Yeni Kurs Ekle",
          url: "/dashboard/kurslar/yeni",
        },
      ],
    },
    {
      title: "Kullanıcılar",
      url: "/dashboard/kullanicilar",
      icon: Users,
    },
    {
      title: "Ödemeler",
      url: "/dashboard/odemeler",
      icon: CreditCard,
    },
    {
      title: "Kategoriler",
      url: "/dashboard/kategoriler",
      icon: Tag,
    },
    {
      title: "Menü",
      url: "/dashboard/menu",
      icon: Frame,
    },
    {
      title: "Ayarlar",
      url: "/dashboard/ayarlar",
      icon: Settings,
    },
  ],
  navSecondary: [],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    // Trigger /me endpoint to load user data
    dispatch(loadUser())
  }, [dispatch])
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard/kullanicilar">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                  <Image
                    src="/icon.png"
                    alt="Verinin Mutfağı"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Verinin Mutfağı</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
