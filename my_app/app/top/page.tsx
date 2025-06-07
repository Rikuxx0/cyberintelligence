import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";

import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Search_form from "@/components/top_components/top/search_form";



import { ImagePlus, ClipboardList, ALargeSmall, Video, Phone } from "lucide-react";

  //仮データ！！！
  //　トレンドデータ
  const trends = [
    { tag: "TypeScript", tweets: "12,300件の投稿" },
    { tag: "ChatGPT", tweets: "28,500件の投稿" },
    { tag: "React", tweets: "9,100件の投稿" },
    { tag: "AWS", tweets: "5,300件の投稿" },
    { tag: "Burp Suite", tweets: "1,700件の投稿" },
  ]

  //ダミーデータ
  const dummyPosts = [
    {
      id: '1',
      title: 'React Hooksの使い方',
      content: 'useStateとuseEffectについて解説します。',
      tags: ['React', 'Hooks'],
    },
    {
      id: '2',
      title: 'TypeScript型の基礎',
      content: 'Union型やIntersection型について説明します。',
      tags: ['TypeScript'],
    },
  ];



export default function Top() {

  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border"
      >
        <ResizablePanel defaultSize={70}>
          {/**クイック投稿機能 */}
          <div>
            <Card>
              <CardContent>
                <div className="flex w-full gap-1">
                  <Input className="w-full h-20 px-4 placeholder:text-sm placeholder:align-top" type="text" placeholder="気軽につぶやいてみよう！ (TypeScript, React, Burp Suite, ChatGPT, AWS など..)" />
                </div>
              </CardContent>
              <CardContent>
                 {/* 左側 */}
                <div className="flex items-center justify-between w-full gap-2">
                  <Button variant="default" className="font-bold">
                    <Phone />
                  </Button>
                  <Button variant="default" className="font-bold">
                    <Video />
                  </Button>
                  <Button  variant="default" className="font-bold">
                    <ALargeSmall />
                  </Button>
                  <Button variant="default" className="font-bold">
                    <ImagePlus />
                  </Button>
                  <Button variant="default" className="font-bold">
                    <ClipboardList />
                  </Button>

                  {/* 右側 */}
                  <Button type="submit" variant="default" className="font-bold ml-auto">
                    投稿
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          {/** 投稿一覧 */}
          <div>
            <Card className="p-4 space-y-4">
                <CardContent>
                    <Tabs defaultValue="followers">
                      <TabsList>
                        <TabsTrigger value="followers">フォロー中</TabsTrigger>
                        <TabsTrigger value="open">オープン</TabsTrigger>
                      </TabsList>
                      <TabsContent value="followers">
                        <Card className="w-full">

                          {/** フォロー中の通話の枠を表示 */}
                          <TabsContent value="followers">
                            
                          </TabsContent>

                          <CardHeader>
                            <CardTitle className="text-lg font-bold">フォロー中の投稿</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {trends.map((trend, idx) => (
                              <div key={idx} className="hover:bg-gray-100 p-2 rounded-md transition-colors cursor-pointer">
                                <p className="text-sm text-muted-foreground">日本のトレンド</p>
                                <p className="font-semibold text-base">#{trend.tag}</p>
                                <p className="text-xs text-gray-500">{trend.tweets}</p>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="open">
                        
                        {/** オープンの通話の枠を表示 */}
                        <TabsContent value="open">
                          
                        </TabsContent>

                        <Card className="w-full">
                          <CardHeader>
                            <CardTitle className="text-lg font-bold">人気の投稿</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {trends.map((trend, idx) => (
                              <div key={idx} className="hover:bg-gray-100 p-2 rounded-md transition-colors cursor-pointer">
                                <p className="text-sm text-muted-foreground">日本のトレンド</p>
                                <p className="font-semibold text-base">#{trend.tag}</p>
                                <p className="text-xs text-gray-500">{trend.tweets}</p>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={30}>
          <Search_form posts={dummyPosts}/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
