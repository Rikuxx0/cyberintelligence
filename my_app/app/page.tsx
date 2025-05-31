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
import ThreeGlobe from "@/components/ThreeGlobe";
import React, { useRef } from "react";
import { ChevronDown } from "lucide-react";





const cardContents = [
  { picture: "picture1", title: "Hello", description: "This is the first card." },
  { picture: "picture2", title: "Cyber", description: "Explore the digital world." },
  { picture: "picture3", title: "AI", description: "Smarter with artificial intelligence." },
  { picture: "picture4", title: "Security", description: "Stay protected online." },
  { picture: "picture5", title: "World", description: "Connect globally." },
  { picture: "picture6", title: "Future", description: "Build what's next." },
];


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
            Cyber Intelligence
        </div>
        {/* 右側: メニュー */}
        <Menubar className="flex justify-end space-x-3 bg-black text-white p-4">
          <MenubarMenu>
            <MenubarTrigger>Top</MenubarTrigger>
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
            <MenubarTrigger>Login</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Create Account</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </header>

      {/* サイバー系のかっこいいアニメーションを作成する */}
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
        <div className="flex items-center mt-6 ml-80">
          <Button onClick={(handleScroll)} className="hover:opacity-80">
            <ChevronDown className="animate-bounce mt-2" />
          </Button>
          
        </div>
      </div>
      <Separator className="border-black" />
      {/*　アプリ簡易説明 */}
      <div ref={targetRef} className="bg-neutral-900 text-white p-0 m-0">
        <h2 className="p-5 text-5xl font-normal">What is Cyber Intelligence ?</h2>
        <ResizablePanelGroup direction="horizontal" className="w-screen h-screen">
          <ResizablePanel defaultSize={100} className="flex items-center justify-center p-8">
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
                          <p className="text-sm text-gray-500">{content.description}</p>
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
      {/* 利用規約とプライバシーポリシーを作成する*/}
      <div className="bg-black min-h-55 text-white text-center">
        <h1 className="p-5 font-bold ">Cyber Intelligence</h1>
        <a>利用規約</a>
        <br />
        <a className="block mt-3.5">プライバシーポリシー</a> 
        
        <p className="p-9">Created by Riku Masukawa in 2025</p>
      </div>

    </div>
  );
}
