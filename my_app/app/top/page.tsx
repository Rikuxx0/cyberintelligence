import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
import Quick_search_form from "@/components/top_components/top/quick_post_form";
import Search_form from "@/components/top_components/top/search_form";



  //仮データ！！！
  //　トレンドデータ
  const trends = [
    { tag: "TypeScript", tweets: "12,300件の投稿" },
    { tag: "ChatGPT", tweets: "28,500件の投稿" },
    { tag: "React", tweets: "9,100件の投稿" },
    { tag: "AWS", tweets: "5,300件の投稿" },
    { tag: "Burp Suite", tweets: "1,700件の投稿" },
  ]

  

export default function Top() {
  
  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border"
      >
        <ResizablePanel defaultSize={70}>
          {/**クイック投稿機能 */}
          <Quick_search_form />
          {/** 人気投稿タグ一覧 */}
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
          <Search_form />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
