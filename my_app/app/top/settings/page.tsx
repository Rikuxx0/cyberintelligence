"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Settings() {
  const [name, setName] = useState("山田 太郎")
  const [email, setEmail] = useState("taro@example.com")
 
  
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">設定</h1>

      {/* プロフィール設定 */}
      <Card>
        <CardHeader>
          <CardTitle>プロフィール</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button>保存</Button>
        </CardContent>
      </Card>

     
      {/* アカウント操作 */}
      <Card>
        <CardHeader>
          <CardTitle>アカウント操作</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">パスワードを変更</Button>
          <Button variant="destructive">アカウントを削除</Button>
        </CardContent>
      </Card>

      <Separator />
      <p className="text-sm text-muted-foreground text-center">最終更新: 2025-06-03</p>
    </div>
  );
}
