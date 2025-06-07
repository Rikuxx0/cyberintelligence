"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, MessageSquare, Search, Plus, Heart, Eye, Clock } from "lucide-react"

export default function Community() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("all")


  // 仮ベースデータ　-> dummyPostsと統合
  const posts = [
    {
      id: 1,
      title: "SQLインジェクションの新しい手法について",
      content:
        "最近発見されたSQLインジェクションの新しい手法について議論しましょう。従来のWAFをバイパスする可能性があります。",
      author: "cyber_ghost",
      tags: ["セキュリティ", "Web"],
      type: "discussion",
      likes: 24,
      views: 156,
      replies: 8,
      createdAt: "2時間前",
    },
    {
      id: 2,
      title: "マルウェア解析環境の構築",
      content: "安全なマルウェア解析環境を構築するためのベストプラクティスを共有します。",
      author: "malware_hunter",
      tags: ["マルウェア解析", "セキュリティ"],
      type: "tutorial",
      likes: 42,
      views: 289,
      replies: 15,
      createdAt: "4時間前",
    },
    {
      id: 3,
      title: "CTF Writeup: Binary Exploitation",
      content: "先週のCTFで出題されたバイナリ問題のWriteupです。ROPチェーンの構築がポイントでした。",
      author: "red_team_lead",
      tags: ["CTF", "逆アセンブル"],
      type: "writeup",
      likes: 67,
      views: 445,
      replies: 23,
      createdAt: "1日前",
    },
    {
      id: 4,
      title: "ネットワーク侵入検知システムの実装",
      content: "Pythonを使ったシンプルなIDSの実装方法について解説します。",
      author: "network_ninja",
      tags: ["ネットワーク", "Python"],
      type: "tutorial",
      likes: 31,
      views: 198,
      replies: 12,
      createdAt: "2日前",
    },
  ]

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
          <Button className="bg-black hover:bg-gray-900 text-white">
            <Plus className="mr-2 h-4 w-4" />
            新規投稿
          </Button>
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
                    <h3 className="text-xl font-semibold text-black mb-2 hover:text-gray-700 cursor-pointer">
                      {post.title}
                    </h3>
                  </div>

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
