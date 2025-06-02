import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';

// Sidebar関連のライブラリ
import SidebarComponent from '@/components/top_components/sidebar/top_sidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function Layout({ children }: { children: React.ReactNode }) {
    
        
    
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SidebarProvider>
                    {/* サイドバー */}
                    <SidebarComponent />
                    
                    {/* メインコンテンツ */}
                    <div className="flex-1 relative p-4">
                        {/* トリガーボタン */}
                        <div className="absolute top-6 left-6 z-50">
                            <SidebarTrigger />
                        </div>
                        <SidebarInset>
                            <main className="flex-1 p-8">
                                {children}
                            </main>
                        </SidebarInset>
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}