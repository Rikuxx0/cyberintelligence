"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Eye, 
  Clock, 
  Search,
  Plus,
  MessageSquare,
  Heart
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

export default function DashboardPosts() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 現在のユーザーを取得
        const { data: { user } } = await supabase.auth.getUser()
        setCurrentUser(user)

        if (user) {
          console.log("Current user ID:", user.id)
          console.log("Current user email:", user.email)
          
          // ユーザーの投稿を取得（user_idまたはauthorで検索）
          const { data, error } = await supabase
            .from("posts")
            .select("*")
            .or(`user_id.eq.${user.id},author.eq.${user.email}`)
            .order("created_at", { ascending: false })

          if (error) {
            console.error("Error fetching posts:", error)
          } else {
            console.log("Fetched posts:", data)
            setPosts(data || [])
          }
        }
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (postId: number) => {
    if (!currentUser) return

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .eq("user_id", currentUser.id)

      if (error) {
        console.error("Delete error:", error)
      } else {
        // 投稿リストを更新
        setPosts(posts.filter(post => post.id !== postId))
      }
    } catch (err) {
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

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || post.type === selectedType
    return matchesSearch && matchesType
  })

  const postTypes = ["all", "discussion", "tutorial", "writeup", "question"]

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/top/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            ダッシュボード
          </Button>
          <div>
            <h1 className="text-3xl font-bold">投稿管理</h1>
            <p className="text-gray-600">あなたの投稿を管理できます</p>
          </div>
        </div>
        <Button
          onClick={() => router.push("/top/community")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          新規投稿
        </Button>
      </div>



      {/* 検索・フィルター */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="投稿を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {postTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
            >
              {type === "all" ? "すべて" : type}
            </Button>
          ))}
        </div>
      </div>

      {/* 投稿一覧 */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="bg-white">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 text-lg">投稿がありません</p>
              <Button
                onClick={() => router.push("/top/community")}
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                最初の投稿を作成
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="bg-white hover:bg-gray-50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${getTypeColor(post.type)} bg-transparent`}>
                        {post.type}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {new Date(post.created_at).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                    
                    <h3 
                      className="text-xl font-semibold text-black mb-2 hover:text-gray-700 cursor-pointer"
                      onClick={() => router.push(`/top/community/${post.id}`)}
                    >
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/top/community/${post.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/top/community/${post.id}/edit`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          編集
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          削除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* 統計情報 */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>投稿統計</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{posts.length}</p>
              <p className="text-sm text-gray-500">総投稿数</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {posts.reduce((sum, post) => sum + post.likes, 0)}
              </p>
              <p className="text-sm text-gray-500">総いいね数</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {posts.reduce((sum, post) => sum + post.views, 0)}
              </p>
              <p className="text-sm text-gray-500">総閲覧数</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {posts.reduce((sum, post) => sum + post.replies, 0)}
              </p>
              <p className="text-sm text-gray-500">総コメント数</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
