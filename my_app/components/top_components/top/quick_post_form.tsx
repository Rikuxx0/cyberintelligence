"use client"

import React, { useState } from 'react'
import { supabase } from '@/lib/supabaseClient';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ImagePlus, ClipboardList, ALargeSmall, Video, Phone } from "lucide-react"
import Line_break_input from './line_break_input';


export default function Quick_search_form() {
  const [ title, setTitle ] = useState(""); //　タイトルの状態保持
  const [ content, setContent ] = useState(""); //コンテンツの状態保持
  const [ type, setType ] = useState(""); // 投稿タイプの状態保持
  const [ tags, setTags ] = useState(""); //　タグの状態保持
  const [ error, setError ] = useState<string | null>(null); //エラーの状態保持
  const [ loading, setLoading ] = useState(false); //ローディングするための状態保持



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // ユーザー取得
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // タグの型を定義
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);

    if ( authError || !user ) {
      setError("You need to Login");
      setLoading(false);
      return;
    }

    // 投稿データをSupabaseに送信
    const { error: insertError} = await supabase.from('posts').insert({
      title,
      content,
      author: user.email, //　または　username　を取得して指定
      user_id: user.id,
      tags: tagArray,
      type,
    });

    if (insertError) {
      setError("Failed to post!");
    } else {
      setTitle("");
      setContent("");
      setTags("");
      setType("");
    }

    setLoading(false);
 };
  
  
  
  return (
    <form onSubmit={handleSubmit}>
        <Card>
            <CardContent>
                <Input
                  placeholder="タイトル"
                  value={title}
                  className="mb-2"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  placeholder="タグ（カンマ区切り: React, Next.js）"
                  value={tags}
                  className="mb-2"
                  onChange={(e) => setTags(e.target.value)}
                />
                <Input
                  placeholder="投稿タイプ（例: 質問, メモ）"
                  value={type}
                  className="mb-2"
                  onChange={(e) => setType(e.target.value)}
                />
                <div className="flex w-full h-full gap-1">
                  <Line_break_input
                    placeholder="気軽につぶやいてみよう！ (TypeScript, React, Burp Suite, ChatGPT, AWS など..)"
                    value={content}
                    rows={3}
                    className="resize-none"
                    onChange={(e) => setContent(e.target.value)}
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
                  <Button type="submit" variant="default" className="font-bold ml-auto" disabled={loading || !content.trim()}>
                    {loading ? "投稿中…" : "投稿"}
                  </Button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </CardContent>
        </Card>
    </form>
  )
}
