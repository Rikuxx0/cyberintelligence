import React from 'react'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';

import { ImagePlus, ClipboardList, ALargeSmall, Video, Phone } from "lucide-react"

import Line_break_input from './line_break_input';


export default function Quick_search_form() {
  return (
    <div>
        <Card>
            <CardContent>
                <div className="flex px-auto py-auto gap-1">
                  <Line_break_input
                    placeholder="気軽につぶやいてみよう！ (TypeScript, React, Burp Suite, ChatGPT, AWS など..)"
                    rows={3}
                    className="resize-none"
                  />
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
  )
}
