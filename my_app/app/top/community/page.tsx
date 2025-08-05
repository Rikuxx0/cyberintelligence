"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, MessageSquare, Search, Plus, Heart, Eye, Clock, MoreVertical, Trash2, Edit } from "lucide-react"

import Quick_search_form from "@/components/top_components/top/quick_post_form"

import { supabase } from "@/lib/supabaseClient"
import type { User } from '@supabase/supabase-js'


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
  createdAt: string
  user_id?: string
}



export default function Community() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")
  const [posts, setPosts] = useState<Post[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null) 

  useEffect(() => {
    const fetchData = async () => {
      // 現在のユーザーを取得
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)

      // 投稿を取得
      const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: true})
      
      if (error) {
        console.error("Error fetching posts", error)
      } else {
        setPosts(data || [])
      }
    }
    
    fetchData()
  }, [])

  
  

  const tags = ["all", "セキュリティ", "逆アセンブル", "OS", "ネットワーク", "マルウェア解析", "CTF", "Web"]

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
    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

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

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Users className="mr-3 h-8 w-8" />
              コミュニティ
            </h1>
            <p className="mt-2">{">"} 知識を共有し、共に成長する場所</p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-black hover:bg-gray-900 text-white">
                <Plus className="mr-2 h-4 w-4" />
                新規投稿
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px] max-w-full p-4">
              <div className="w-full">
                <Quick_search_form />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
            <Input
              placeholder="投稿を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white  text-black placeholder-black"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={
                  selectedTag === tag
                    ? "bg-white  text-black hover:bg-gray-100"
                    : "hover:bg-white"
                }
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="bg-white hover:bg-gray-100 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={`${getTypeColor(post.type)} bg-transparent`}>{post.type}</Badge>
                      <span className="text-black text-sm">@{post.author}</span>
                      <span className="text-black text-sm flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {post.createdAt}
                      </span>
                      {/* 投稿者本人のみ削除ボタンを表示 */}
                      {currentUser && post.user_id === currentUser.id && (
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
                            <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              削除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    <h3 
                      className="text-xl font-semibold text-black mb-2 hover:text-gray-700 cursor-pointer"
                      onClick={() => router.push(`/top/community/${post.id}`)}
                    >
                      {post.title}
                    </h3>

                    <p className="text-black mb-4 line-clamp-2">{post.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs text-black">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-black">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-100">
            さらに読み込む
          </Button>
        </div>
      </div>
  )
}
