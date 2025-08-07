# Cyber Intelligence Platform

サイバーセキュリティとコンピュータサイエンスの知識共有プラットフォーム

## 機能

- ユーザー認証（ログイン/登録）
- 投稿機能
- コミュニティ機能
- メッセージング機能
- お気に入り機能
- ダッシュボード

## 技術スタック

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- Three.js

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. 環境変数の設定
```bash
cp .env.example .env.local
```

`.env.local`ファイルに以下を設定：
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. 開発サーバーの起動
```bash
npm run dev
```

## デプロイ

### Vercel

1. Vercelにプロジェクトを接続
2. 環境変数を設定
3. デプロイ

### その他のプラットフォーム

```bash
npm run build
npm start
```

## データベース設定

Supabaseで以下のテーブルが必要：

- `profiles` - ユーザープロフィール
- `posts` - 投稿
- `favorite_posts` - お気に入り投稿

## ライセンス

MIT 