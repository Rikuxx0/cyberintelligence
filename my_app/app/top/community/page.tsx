import React from 'react'
import Search_form from '@/components/top_components/top/search_form'
import Trend_form from '@/components/top_components/top/trend_form';



//ダミーデータ
  const dummyPosts = [
    {
      id: '1',
      title: 'React Hooksの使い方',
      content: 'useStateとuseEffectについて解説します。',
      tags: ['React', 'Hooks'],
    },
    {
      id: '2',
      title: 'TypeScript型の基礎',
      content: 'Union型やIntersection型について説明します。',
      tags: ['TypeScript'],
    },
  ];


//トレンドデータでtag検索できるようにする
export default function Community() {
  return (
    <div>
      <Search_form posts={dummyPosts}/>
      <Trend_form />
    </div>
  );
}
