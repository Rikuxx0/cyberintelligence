
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export default function Dashboard() {
  //　ユーザー情報
  const user = {
    name: "John Doe",
    email: "john@example.com",
    bio: "フロントエンド開発者 / サイバーセキュリティ愛好家",
    avatarUrl: "https://github.com/shadcn.png",
    posts: 12,
    follow: 5,
    followers: 21,
    comments: 45,
    lastLogin: "2025/06/03",
  };

  //フォローしている技術タグ
  const followingTags = [
    { name: "セキュリティ", posts: 156, color: "#ff0000" },
    { name: "逆アセンブル", posts: 89, color: "#00ff00" },
    { name: "OS", posts: 234, color: "#0000ff" },
    { name: "ネットワーク", posts: 67, color: "#ff00ff" },
  ]

  //最近のアクシビティの投稿
  const recentActivity = [
    { type: "post", title: "SQLインジェクション解析完了", time: "２週間前", tag: "セキュリティ" },
    { type: "comment", title: "マルウェア解析スレッドにコメント", time: "４時間前", tag: "逆アセンブル" },
    { type: "follow", title: "OSINTタグをフォロー開始", time: "１日前", tag: "OSINT"},
    { type: "favorite", title: "ペネトレ記事をお気に入り追加", time: "２日前", tag: "ペネトレーションテスト"}
  ]

  

  return (
    <div className="mx-auto p-6 space-y-6">
      <Card className="flex w-full">
        <CardHeader>
          <CardTitle>プロフィール</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm mt-2">{user.bio}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">編集</Button>
              <Button size="sm" variant="ghost">ログアウト</Button>
            </div>
          </div>
        </CardContent>
      </Card>


      {/**　　フォローしているタグ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            フォローしている技術タグ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {followingTags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded border transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }}></div>
                  <span>{tag.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{tag.posts} posts</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>



      
      <Card>
        <CardHeader>
          <CardTitle>統計情報</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row text-center justify-center gap-x-30">
          <Link href={`/top/dashboard/posts`}>
            <div>
              <p className="text-2xl font-bold">{user.posts}</p>
              <p className="text-sm text-muted-foreground">投稿</p>
            </div>
          </Link>
          <Link href={`/top/dashboard/follow`}>
            <div>
              <p  className="text-2xl font-bold" >{user.follow}</p>
              <p className="text-sm text-muted-foreground">フォロー数</p>
            </div>
          </Link>
          <Link href={`/top/dashboard/followers`}>
            <div>
              <p className="text-2xl font-bold">{user.followers}</p>
              <p className="text-sm text-muted-foreground">フォロワー数</p>
            </div>
          </Link>
           <Link href={`/top/dashboard/comments`}>
            <div>
              <p className="text-2xl font-bold">{user.comments}</p>
              <p className="text-sm text-muted-foreground">コメント</p>
            </div>
          </Link>
          <div>
            <p className="text-2xl font-bold">{user.lastLogin}</p>
            <p className="text-sm text-muted-foreground">最終ログイン</p>
          </div>
        </CardContent>
      </Card>

     
      <div className="grid grid-cols-1 lg:grid-col-2 gap-6">
         {/** 最近のアクティビティの投稿 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex itmes-center">
              <Activity className="mr-2 h-5 w-5" />
              最近の投稿
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 round border transition-colors"
                >
                <div className="flex-1">
                    <p className="text-sm">{activity.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.tag}
                      </Badge>
                      <span className="text-sm">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
