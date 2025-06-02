import React, { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { ImagePlus, ClipboardList, ALargeSmall, Video, Phone, Search } from "lucide-react";

//　トレンドデータ
const trends = [
  { tag: "TypeScript", tweets: "12,300件の投稿" },
  { tag: "ChatGPT", tweets: "28,500件の投稿" },
  { tag: "React", tweets: "9,100件の投稿" },
  { tag: "AWS", tweets: "5,300件の投稿" },
  { tag: "Burp Suite", tweets: "1,700件の投稿" },
]

type Trend = {
  tag: string
  tweets: string
}



// カテゴリごとのトレンドデータ
const trendsByCategory: Record<string, Trend[]> = {
  TypeScript: [
    { tag: "TypeScript5.4", tweets: "12,300件の投稿" },
    { tag: "tsconfig", tweets: "3,200件の投稿" },
  ],
  JavaScript: [
    { tag: "ES2024", tweets: "18,900件の投稿" },
    { tag: "Bun", tweets: "5,800件の投稿" },
  ],
  React: [
    { tag: "React19", tweets: "25,000件の投稿" },
    { tag: "ServerActions", tweets: "4,700件の投稿" },
  ],
  ChatGPT: [
    { tag: "GPT-4.5", tweets: "14,200件の投稿" },
    { tag: "Sora", tweets: "9,800件の投稿" },
  ],
  AWS: [
    { tag: "EC2", tweets: "3,900件の投稿" },
    { tag: "Bedrock", tweets: "1,400件の投稿" },
  ],
}


export default function Top() {
  // ランダムに3カテゴリを抽出（クライアントサイド）
  const categories = useMemo(() => {
    const keys = Object.keys(trendsByCategory)
    return keys.sort(() => 0.5 - Math.random()).slice(0, 3)
  }, [])
  
  
  
  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border"
      >
        <ResizablePanel defaultSize={29}>
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
                    <Tabs>
                      <TabsList>
                        <TabsTrigger value="followers">フォロー中</TabsTrigger>
                        <TabsTrigger value="open">オープン</TabsTrigger>
                      </TabsList>
                      <TabsContent value="followers">
                        <Card className="w-full">
                          {/** フォロー中の通話の枠を表示 */}



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
        <ResizableHandle />
        <ResizablePanel defaultSize={15}>
          <ResizablePanelGroup direction="vertical" className="rounded-lg border">
            <ResizablePanel defaultSize={10}>
              {/** 検索機能 */}
              <Card>
                <CardContent>
                  <div className="flex w-full h-full gap-1">
                    <Search />
                    <input className="w-full px-4 placeholder:text-sm placeholder:align-top border-none outline-none" type="search" placeholder="Search"/>
                  </div>
                </CardContent>
              </Card>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>
              {/** タグジャンルからトレンド記事表示 */}
              <div>
                 <Card className="p-4 space-y-4 w-full">
                    <CardContent>
                      <Tabs defaultValue={categories[0]}>
                        <TabsList>
                          {categories.map((cat) => (
                            <TabsTrigger key={cat} value={cat}>
                              {cat}
                            </TabsTrigger>
                          ))}
                        </TabsList>

                        {categories.map((cat) => (
                          <TabsContent key={cat} value={cat}>
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg font-bold">{cat}のトレンド</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                {trendsByCategory[cat].map((trend, idx) => (
                                  <div
                                    key={idx}
                                    className="hover:bg-gray-100 p-2 rounded-md transition-colors cursor-pointer"
                                  >
                                    <p className="text-sm text-muted-foreground">日本のトレンド</p>
                                    <p className="font-semibold text-base">#{trend.tag}</p>
                                    <p className="text-xs text-gray-500">{trend.tweets}</p>
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </CardContent>
                  </Card>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
