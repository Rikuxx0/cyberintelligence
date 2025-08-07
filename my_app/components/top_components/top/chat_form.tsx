"use client"

import React, { useState } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

//　アカウント情報の型
type Props = {
  accountName: string | null;
};

//　メッセージの型
type Message = {
  id: number
  text: string
  sender: 'me' | 'other'
}


export default function Chat_form({ accountName  }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'こんにちは！', sender: 'other' },
    { id: 2, text: 'やあ！調子どう？', sender: 'me' },
  ])
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages([...messages, { id: Date.now(), text: input, sender: 'me' }])
    setInput('')
  }
  

  if (!accountName) {
    return <div className="text-gray-400">アカウントを選択してください</div>;
  }
  
  return (
     <div className="flex flex-col h-full w-full border shadow rounded-lg overflow-hidden">
      <Card className="rounded-none border-b w-full px-5 flex item-start">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{accountName}</h2>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </Card>

      <ScrollArea className="flex-1 px-4 py-3 bg-muted">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`max-w-xs px-4 py-2 ${
              message.sender === 'me'
                ? 'ml-auto bg-blue-500 text-white'
                : 'mr-auto bg-white'
            } rounded-xl`}
          >
            <CardContent className="p-0">{message.text}</CardContent>
          </Card>
        ))}
      </ScrollArea>

      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-1"
          />
          <Button type="submit" size="sm">
            送信
          </Button>
        </div>
      </form>
    </div>
  )
}
