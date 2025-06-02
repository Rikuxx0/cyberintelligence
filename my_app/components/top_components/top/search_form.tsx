"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Post = {
  id: string;
  title: string;
  content: string;
  tags: string[]; // 例: ['React', 'TypeScript']
};

type Props = {
  posts: Post[];
};

//タグをもとに検索を行う　
export default function Search_form({ posts }: Props) {
  const [keyword, setKeyword] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase().includes(keyword.toLowerCase()))
  );

  return (
   <>
    {/* 検索フォーム */}
      <Card>
            <CardContent>
                <div className="flex w-full h-full gap-2">
                    <Search className="mt-1.5"/>
                    <Input 
                      className="w-full px-4 placeholder:text-sm placeholder:align-top border-none outline-none" 
                      type="search" 
                      placeholder="Search" 
                      value={keyword} 
                      onChange={(e) => setKeyword(e.target.value.replace(/^#/, ''))}
                    />
                </div>
            </CardContent>
      </Card>

        {/** 結果表示 */}
        <div className="space-y-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="space-y-1 p-4">
                  <p className="font-semibold">{post.title}</p>
                  <p className="text-sm text-gray-500">{post.content}</p>
                  <div className="flex gap-2 mt-1 text-xs text-blue-600">
                    {post.tags.map((tag, i) => (
                      <span key={i}>#{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
          <p className="text-sm text-muted-foreground">一致する投稿がありません</p>
        )} 
        </div>
    </>
  );
}
