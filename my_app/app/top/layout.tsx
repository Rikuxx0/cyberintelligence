
import '@/app/globals.css';

// Sidebar関連のライブラリ
import SidebarComponent from '@/components/top_components/sidebar/top_sidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';



export default function Layout({ children }: { children: React.ReactNode }) { 
    return (
                <SidebarProvider>
                    <SidebarComponent />
                    <div className="flex-1 relative p-4">
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
    );
}