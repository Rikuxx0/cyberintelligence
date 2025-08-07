import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { HeartIcon } from "lucide-react"

// お気に入りデータ
const favoritePosts = [
  {
    id: 1,
    title: "ReactとTypeScriptで安全なコードを書く",
    excerpt: "useStateの型注釈やPropsの定義について解説します。",
    date: "2025-06-01",
  },
  {
    id: 2,
    title: "セキュアなAPI通信方法",
    excerpt: "JWTとOAuthの違いをわかりやすく解説します。",
    date: "2025-05-25",
  },
]


export default function My_favorite() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">お気に入りリスト</h1>
      <Separator />

      {favoritePosts.length === 0 ? (
        <p className="text-muted-foreground">お気に入り投稿はまだありません。</p>
      ) : (
        favoritePosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.date}</span>
                <Button variant="ghost" size="sm" className="text-red-500 hover:bg-transparent">
                  <HeartIcon className="w-4 h-4 mr-1" /> 解除
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
