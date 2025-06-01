"use client"

import React from 'react'

import { Layers ,Orbit ,UserRound, Heart, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// サイドバーのアイコン
const items = [
  {
    title: "Top",
    url: "#",
    icon: Layers,
  },
  {
    title: "Community",
    url: "/top/community",
    icon: Orbit,
  },
  {
    title: "My Favorite",
    url: "/top/my_favorite",
    icon: Heart,
  },
  {
    title: "Dashboard",
    url: "/top/dashboard",
    icon: UserRound,
  },
  {
    title: "Settings",
    url: "/top/settings",
    icon: Settings,
  },
]



export default function SidebarComponent() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">Cyber Intelligence</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
