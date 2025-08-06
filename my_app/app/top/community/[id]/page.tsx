"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  Heart, 
  Eye, 
  MessageSquare, 
  Share2, 
  MoreVertical,
  Trash2,
  Edit,
  Clock,
  User
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabaseClient"
import type { User as SupabaseUser } from '@supabase/supabase-js'

type Post = {
  id: number
  title: string
  content: string
  author: string
  tags: string[]
  type: string
  likes: number
  views: number
  replies: number
  created_at: string
  user_id?: string
}

export default function PostDetail() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  
  //　投稿を取得するための機能
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 現在のユーザーを取得
        const { data: { user } } = await supabase.auth.getUser()
        setCurrentUser(user)

        // 投稿詳細を取得
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", params.id)
          .single()

        if (error) {
          setError("投稿が見つかりません")
          console.error("Error fetching post:", error)
        } else {
          setPost(data)
        }
      } catch (err) {
        setError("エラーが発生しました")
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  //お気に入りのデータを取得するための機能
  useEffect(() => {
    const checkFavorite = async () => {
      if(!currentUser || !params.id) return
      const { data } = await supabase
        .from("favorite_posts")
        .select("*")
        .eq("user_id", currentUser.id)
        .eq("post_id", Number(params.id))
        .single()

        if (data) setIsFavorite(true)
        else setIsFavorite(false)
    }

    checkFavorite()
  }, [currentUser, params.id])


  //　お気に入りに入れるためのトグル処理関数
  const handleToggleFavorite = async () => {
  if (!currentUser || !post) return

  if (isFavorite) {
    // 削除
    const { error } = await supabase
      .from("favorite_posts")
      .delete()
      .eq("user_id", currentUser.id)
      .eq("post_id", post.id)

    if (!error) setIsFavorite(false)
  } else {
    // 追加
    const { error } = await supabase
      .from("favorite_posts")
      .insert({
        user_id: currentUser.id,
        post_id: post.id,
      })

    if (!error) setIsFavorite(true)
  }
}




  // 投稿削除のためのハンドリング
  const handleDelete = async () => {
    if (!post || !currentUser) return

    // 投稿者本人のみ削除可能
    if (post.user_id !== currentUser.id) {
      setError("削除権限がありません")
      return
    }

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", post.id)

      if (error) {
        setError("削除に失敗しました")
        console.error("Delete error:", error)
      } else {
        router.push("/top/community")
      }
    } catch (err) {
      setError("削除中にエラーが発生しました")
      console.error("Delete error:", err)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "discussion":
        return "border-blue-500 text-blue-400"
      case "tutorial":
        return "border-green-500 text-green-400"
      case "writeup":
        return "border-purple-500 text-purple-400"
      case "question":
        return "border-yellow-500 text-yellow-400"
      default:
        return "border-gray-500 text-gray-400"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">{error || "投稿が見つかりません"}</div>
      </div>
    )
  }

  const isAuthor = currentUser && post.user_id === currentUser.id

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* 戻るボタン */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        戻る
      </Button>

      {/* 投稿詳細 */}
      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">@{post.author}</span>
                  <Badge className={`${getTypeColor(post.type)} bg-transparent`}>
                    {post.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(post.created_at).toLocaleString('ja-JP')}</span>
                </div>
              </div>
            </div>

            {/* 投稿者本人のみ表示するドロップダウンメニュー */}
            {isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push(`/top/community/${post.id}/edit`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    編集
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push(`/top/dashboard/posts`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    投稿管理
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    削除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* タイトル */}
          <CardTitle className="text-2xl font-bold text-black">
            {post.title}
          </CardTitle>

          {/* タグ */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* コンテンツ */}
          <div className="prose max-w-none">
            <p className="text-black text-lg leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* アクション */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleToggleFavorite}>
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{post.replies}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                シェア
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="h-4 w-4" />
              <span>{post.views} 回閲覧</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* コメントセクション（将来の実装用） */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">コメント</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            コメント機能は今後実装予定です
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 