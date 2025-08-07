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

import { supabase } from '@/lib/supabaseClient';

type Post = {
  id: string;
  title: string;
  content: string;
  tags: string[]; // 例: ['React', 'TypeScript']
};



export default function Search_form() {
  const [ posts, setPosts ] = useState<Post[]>([])
  
  useEffect(() => {
    const fetchPosts = async () =>{
      const { data, error } = await supabase.from("posts").select("*").order("created_at", {ascending: true})
      if( error ) {
        console.error("Error fetching posts:", error)
        return
      }

      const mapped = data.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        tags: post.tags || [],
      }))

      setPosts(mapped)
      console.log("Mapped posts:", mapped)
    }

    fetchPosts()
  }, [])

  const [keyword, setKeyword] = useState('')
  const [submittedKeyword, setSubmittedKeyword] = useState('')
  const [open, setOpen] = useState(false)
  
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const [searchBoxWidth, setSearchBoxWidth] = useState<number | null>(null);

  useEffect(() => {
  if (searchBoxRef.current) {
    setSearchBoxWidth(searchBoxRef.current.offsetWidth);
  }
  }, [keyword]); 

  const keywordLower = submittedKeyword.toLowerCase();

  const filteredPosts = posts.filter((post) => {
    const tagMatches = post.tags.some((tag) => {
      return tag.toLowerCase().includes(keywordLower);
    });
    return tagMatches;
  });

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
      e.preventDefault();
      setSubmittedKeyword(keyword.trim());
      setOpen(true);
    };
  }

  function PostCard({ post }: { post: Post }) {
    return (
      <Card className="w-full">
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
    );
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
                                placeholder="Search tags" 
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
        <div className="space-y-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              「{submittedKeyword}」一致する投稿がありません
            </p>
          )}
        </div>
      </PopoverContent>
      </Popover>
      <div className='flex justify-center items-center mt-30 font-bold'>
        今、何が投稿されているか調べてみよう！
      </div>
    </>
  );
}
