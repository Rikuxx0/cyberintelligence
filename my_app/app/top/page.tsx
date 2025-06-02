
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { ImagePlus, ClipboardList, ALargeSmall, Video, Phone } from "lucide-react";



export default function Top() {
  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border"
      >
        <ResizablePanel defaultSize={29}>
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
          <div>
            <Card>
              タイムラインの投稿表示+通話ルーム +a フォローとオープンで分ける
            </Card>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={15}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={10}>
              <div className="flex w-full h-full justify-center items-center gap-1">
                <input className="w-120 px-4 placeholder:text-sm placeholder:align-top" type="search" placeholder="Search"/>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">タグジャンルからトレンド記事表示</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
