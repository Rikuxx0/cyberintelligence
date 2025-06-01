import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';

import SidebarComponent from '@/components/sidebar/top_sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function TopLayout({children}: { children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SidebarProvider>
                    {/* サイドバー */}
                    <SidebarComponent />

                    {/* メインコンテンツ */}
                    <div className="flex-1 relative p-4">
                        {/* トリガーボタン */}
                        <div className="absolute top-2 left-1 z-50">
                            <SidebarTrigger />
                        </div>
                        <main className="flex-1 p-4">
                            {children}
                        </main>
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}