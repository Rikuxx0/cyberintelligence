"use client"

import React from 'react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from '@/components/ui/card'


// メッセージリスト一覧
const message_directory = Array.from({ length: 10 }).map(
  (_, i, a) => `Account.${a.length - i}`
)

export default function Message_list() {
  return (
    <ScrollArea className="h-full w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-2xl leading-none font-medium">Messages List</h4>
        {message_directory.map((message) => (
            <React.Fragment key={message}>
                <Card>  
                    <CardContent>

                            <Avatar className='ml-1'>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <br />
                            <div className="flex text-xl justify-start items-center">
                                {message}
                            </div>

                    </CardContent>
                </Card>
            </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
