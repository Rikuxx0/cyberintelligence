"use client"

import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { supabase } from "@/lib/supabaseClient";
import { deleteUser } from "@/actions/deleteUser"

export default function Settings() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setEmail(user.email || "");
        
        // プロフィール情報を取得
        const { data: profile } = await supabase
          .from("profiles")
          .select("username, full_name")
          .eq("user_id", user.id)
          .single();
        
        if (profile) {
          setName(profile.full_name || profile.username || "");
        }
      }
    };
    fetchUser();
  }, []);

  // アカウント削除機能のハンドリング
  const handleDeleteAccount = async () => {
    if (!userId) {
      alert("ユーザー情報が見つかりません。ログインしてください。");
      return;
    }

    const confirmed = confirm("本当にアカウントを削除しますか？この操作は取り消せません。");
    if (!confirmed) return;

    try {
        await deleteUser(userId);
        await supabase.auth.signOut();
        alert("アカウントが削除されました。");
        window.location.href = "/";
    } catch (error) {
        console.error("削除エラー:", error);
        alert("削除に失敗しました。");
    }


  }


  //　ログアウト機能の」ハンドリング
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("ログアウトエラー:", error.message);
    } else {
      window.location.href = "/";
    }
  };


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
        <CardContent className="grid grid-rows-3 gap-2">
          <Button variant="outline">パスワード変更</Button>
          <Button variant="default" onClick={handleLogout}>ログアウト</Button>
          <Button variant="destructive" onClick={handleDeleteAccount}>アカウントを削除</Button>
        </CardContent>
      </Card>

      <Separator />
      <p className="text-sm text-muted-foreground text-center">最終更新: 2025-06-03</p>
    </div>
  );
}
