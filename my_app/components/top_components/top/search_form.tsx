"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
  const [keyword, setKeyword] = useState(''); //検索ワードの保持
  const [submittedKeyword, setSubmittedKeyword] = useState(''); //提出する時のワードの保持
  const [open, setOpen] = useState(false); // ポップオーバー開閉制御

  //検索フォームのサイズによって、検索結果のサイズの変化
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const [searchBoxWidth, setSearchBoxWidth] = useState<number | null>(null);

  useEffect(() => {
  if (searchBoxRef.current) {
    setSearchBoxWidth(searchBoxRef.current.offsetWidth);
  }
  }, [keyword]); // 入力のたびにサイズ再計測


 
//検索する時のフィルター
  const filteredPosts = posts.filter((post) =>
      post.tags.some((tag) => 
        tag.toLowerCase().includes(submittedKeyword.toLowerCase())
      )
    );

  
  //検索し、enterを押すためのハンドラ
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
      e.preventDefault();
      setSubmittedKeyword(keyword.trim());
      setOpen(true); // Enter で開く
    };
  }

  return (
    <>
      {/* 検索フォーム */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div ref={searchBoxRef}>
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
                                onKeyDown={handleKey}
                                onFocus={() => 
                                  setOpen(true)
                                }
                              />
                      </div>
                </CardContent>
            </Card>
          </div>
      </PopoverTrigger> 
      <PopoverContent style={{ width: searchBoxWidth ?? 'auto' }}>
        {/** Enter 押して submittedKeyword がある時だけ表示 */}
        <div className="space-y-3">
          {submittedKeyword === '' && open ? (
            <div>気になる技術を入力してみよう</div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card key={post.id} className='w-full'>
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
            <p className="text-sm text-muted-foreground">
              「{submittedKeyword}」一致する投稿がありません
            </p>
          )}
        </div>
      </PopoverContent>
      </Popover>
    </>
  );
}
