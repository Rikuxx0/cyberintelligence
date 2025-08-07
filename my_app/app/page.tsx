"use client"

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,} from "@/components/ui/menubar";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
 } from "@/components/ui/navigation-menu";

import { Separator } from "@/components/ui/separator";
import { 
         ResizablePanel,
         ResizablePanelGroup,
 } from "@/components/ui/resizable";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThreeGlobe from "@/components/ThreeGlobe";
import React, { useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";





const cardContents = [
  {
    picture: "pictures1",
    title: "ギーカー特化",
    description: "サイバーセキュリティやコンピュータサイエンスの最新情報と技術を共有",
  },
  {
    picture: "pictures2",
    title: "コミュニティ",
    description: "ハッカーとエンジニアが集う知識共有の場",
  },
  {
    picture: "pictures3",
    title: "HackMap - 技術深掘り",
    description: "フロントエンドからバックエンド、インフラまでのアルゴリズムフローを深く学習",
  },
  {
    picture: "pictures4",
    title: "The Cyber World",
    description: "擬似サイバー攻撃の再現と学習環境",
  },
];


// 人気タグデータ
const popularTags = [
  { name: "セキュリティ", count: 156, color: "#ff0000" },
  { name: "逆アセンブル", count: 89, color: "#00ff00" },
  { name: "OS", count: 234, color: "#0000ff" },
  { name: "ネットワーク", count: 67, color: "#ff00ff "},
  { name: "マルウェア解析", count: 45, color: "#ffff00"},
  { name: "CTF", count: 123, color: "#00ffff"},
]

const recentPosts = [
  {
    title: "SQLインジェクションの新しい手法について",
    author: "cyber_ghost",
    tags: ["セキュリティ", "Web"],
    time: "２週間前"
  },
  {
    title: "マルウェア解析環境の構築",
    author: "malware_hunter",
    tags: ["マルウェア解析"],
    time: "４週間前"
  },
  {
    title: "CTF Writeup: Binary Exploitation",
    author: "red_team_lead",
    tags: ["CTF", "逆アセンブル"],
    time: "１日前"
  }
]




export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null!);

  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  
  return (
    <div>
      {/* ヘッダー全体　*/}
      <header className="flex justify-between items-center bg-black text-white px-6 py-4 shadow">
        {/* 左側のロゴ*/ }
        <div className="text-2xl font-bold tracking-wide transition hover:opacity-80">
            <Link href="/">Cyber Intelligence</Link>
        </div>
        {/* 右側: メニュー */}
        <Menubar className="flex justify-end space-x-3  bg-black text-white p-4">
            <MenubarMenu>
              <Link href="/">
                <MenubarTrigger>Top</MenubarTrigger>
              </Link>
            </MenubarMenu>
            <NavigationMenu className="text-base">
              <NavigationMenuList className="flex gap-6">
                <NavigationMenuItem className="text-lg px-4 py-2">
                  <NavigationMenuTrigger>App</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white shadow-lg rounded p-4 min-w-[200px]">
                    <NavigationMenuLink className="text-lg">HackMap</NavigationMenuLink>
                    <Separator className="my-2" />
                    <NavigationMenuLink className="text-lg">The Cyber World</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <MenubarMenu>
              <Link href="/login">
                <MenubarTrigger>Login</MenubarTrigger>
              </Link>
            </MenubarMenu>
            <MenubarMenu>
            <Link href="/createAccount">
                <MenubarTrigger>Create Account</MenubarTrigger>
            </Link>
            </MenubarMenu>
        </Menubar>
      </header>

      {/* サイバー系のアニメーションを作成する */}
      <div className="relative w-screen h-screen overflow-hidden bg-slate-700">
        <main className="absolute w-full h-full top-10 left-110 z-0">
          <ThreeGlobe />
        </main>


        {/* 動画の上に重ねる */}
        <div className="relative z-10 text-shadow-black p-9 mt-30 ml-15">
          <h1 className="text-9xl font-bold">Cyber</h1>
          <h2 className="text-8xl ml-9 font-bold">Intelligence</h2>
          <p className="mt-10 ml-3 text-4xl font-bold">さあ、ギーカーの世界へ飛び込もう</p>
        </div>
        <div className="flex ml-64">
          <Button
            size="lg"
            variant="outline"
            className="bg-neutral-800 text-white border-cyan-600 hover:bg-black hover:border-cyan-400 hover:text-white transition-colors cursor-pointer"
            onClick={() => (window.location.href = "/createAccount")}
          >
            コミュニティに参加
          </Button>
        </div>
        <div className="flex items-center mt-6 ml-80">
          <Button onClick={(handleScroll)} className="hover:opacity-80">
            <ChevronDown className="animate-bounce mt-2" />
          </Button>  
        </div>
      </div>
      
      {/*　アプリ簡易説明 */}
      <section>
        <div ref={targetRef} className="bg-neutral-900 text-white p-10 m-0">
          <div className="flex items-center justify-center text-center mb-8">
            <h1 className="text-5xl font-bold ">Cyber Intelligenceとは？</h1>
          </div>
          <p className="text-2xl font-semibold text-center mx-auto mt-10 mb-10">
              {">"} サイバーセキュリティやコンピュータサイエンス学習者、ハッカーとギーカーが集う知識共有コミュニティサイトです
          </p>


          <h2 className="text-4xl font-bold text-center py-5 mb-5">{">"} システム機能</h2>
          <ResizablePanelGroup direction="horizontal" className="w-screen h-screen">
            <ResizablePanel defaultSize={100} className="flex items-center justify-center p-2">
              <Carousel className="w-7xl rounded-lg">
                <CarouselContent>
                  {cardContents.map((content, index) => (
                    <CarouselItem key={index}>
                      <Card className="w-full h-full">
                        <CardContent className="flex flex-row w-full h-full p-6 gap-6">
                          {/* 左側：画像パネル */}
                          <div className="flex-1 flex items-center aspect-square  justify-center bg-neutral-800 rounded-lg">
                            <span className="text-xl font-semibold">{content.picture}</span>
                          </div>

                          {/* 右側：テキスト */}
                          <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <span className="text-2xl font-bold mb-2">{content.title}</span>
                            <p className="text-4sm text-gray-500">{content.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-black" />
                <CarouselNext className="text-black" />
              </Carousel>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>

        {/** 人気タグ */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">{">"} 人気のタグ</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularTags.map((tag, index) => (
                  <Card
                    key={index}
                    className="bg-gray-300  hover:border-cyan-400 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4 text-center">
                      <div className="w-4 h-4 rounded-full mx-auto md-2" style={{ backgroundColor: tag.color }}></div>
                      <h3 className="font-semibold text-sm mb-1">{tag.name}</h3>
                      <p className="text-xs">{tag.count} posts</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
          </div>
        </section>

        {/**　最近の投稿 */}
        <section className="py-20  bg-neutral-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">{">"} 最新の投稿</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {recentPosts.map((post, index) => (
                <Card key={index} className="bg-neutral-900 border-cyan-600 hover:border-cyan-400 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between text-white">
                     <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <div className="flex items-center space-x-4">
                          <span className="text-sm">@{post.author}</span>
                          <span className="text-sm">{post.time}</span>
                          <div className="flex gap-2">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="outline"
                                className="text-xs text-white"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="bg-white border-cyan-600 hover:bg-neutral-400 hover:border-cyan-400 transition-colors cursor-pointer"
                onClick={() => (window.location.href = "/createAccount")}
              >
                すべての投稿を見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
                  
     
      {/* 利用規約とプライバシーポリシーを作成する*/}
      <div className="bg-black min-h-50 text-white text-center">
        <h1 className="p-5 font-bold ">Cyber Intelligence</h1>
        <a>利用規約</a>
        <br />
        <a className="block mt-3.5">プライバシーポリシー</a> 
        
        <p className="p-9"> 2025 Cyber Intelligence Community. All rights reserved.</p>
      </div>
    </div>
  );
}
