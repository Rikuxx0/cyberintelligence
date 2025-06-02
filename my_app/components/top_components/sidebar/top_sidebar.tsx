"use client"

import React from 'react'

import { Layers ,Orbit, MessageCircle, UserRound, Heart, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"

import { NavUser } from './nav_user'

// 仮のデータ
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

// サイドバーのアイコン
const items = [
  {
    title: "Top",
    url: "/top",
    icon: Layers,
  },
  {
    title: "Community",
    url: "/top/community",
    icon: Orbit,
  },
  {
    title: "Message",
    url: "/top/message",
    icon: MessageCircle,
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
    <Sidebar variant="inset" side='left' collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {/** 後でアイコンを作成すること！ */}
          <SidebarGroupLabel className="text-2xl font-bold text-black p-2">
            Cyber Intelligence
          </SidebarGroupLabel>
          <SidebarGroupContent className='mt-3'>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-3">
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span className="text-2xl">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/** ユーザー表示関係 */}
            <SidebarFooter>
              <NavUser user={data.user}/>
            </SidebarFooter>
    </Sidebar>
  )
}
