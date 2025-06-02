"use client"

import React, { useMemo } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


//仮データ
//トレンドの型定義
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



export default function Trend_form() {
    // ランダムに3カテゴリを抽出（クライアントサイド）
    const categories = useMemo(() => {
    const keys = Object.keys(trendsByCategory)
    return keys.sort(() => 0.5 - Math.random()).slice(0, 3)
    }, [])
  
    return (
    <div className="h-full">
        <Card className="p-4 w-full h-full">
            <CardContent className="h-full flex flex-col">
                <Tabs defaultValue={categories[0]} className="h-full flex flex-col">
                    <TabsList>
                        {categories.map((cat) => (
                            <TabsTrigger key={cat} value={cat}>
                                {cat}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {categories.map((cat) => (
                    <TabsContent key={cat} value={cat} className="flex-1 overflow-y-auto">
                        <Card className="h-full">
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
  )
}
