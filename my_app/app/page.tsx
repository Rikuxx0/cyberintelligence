import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,} from "@/components/ui/menubar";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
 } from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div>
      {/* ヘッダー全体　*/}
      <header className="flex justify-between items-center bg-black text-white px-6 py-4 shadow">
        {/* 左側のロゴ*/ }
        <div className="text-2xl font-bold tracking-wide transition hover:opacity-80">
              Cyber Intelligence
        </div>
        {/* 右側: メニュー */}
        <Menubar className="flex justify-end space-x-3 bg-black text-white p-4">
          <MenubarMenu>
            <MenubarTrigger>Top</MenubarTrigger>
          </MenubarMenu>
          <NavigationMenu className="text-base">
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem className="text-lg px-4 py-2">
                <NavigationMenuTrigger>App</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg rounded p-4 min-w-[200px]">
                  <NavigationMenuLink className="text-lg">HackMap</NavigationMenuLink>
                  <Separator className="my-2" />
                  <NavigationMenuLink className="text-lg">The Cyber World</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <MenubarMenu>
            <MenubarTrigger>Login</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Create Account</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </header>

      {/* サイバー系のかっこいいアニメーションをThree.jsで作成する */}
      <div className="relative w-screen h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source/>
          Your browser does not support the video tag.
        </video>

        {/* 動画の上に重ねる */}
        <div className="relative z-10 text-black p-9 top-30 left-15">
          <h1 className="text-9xl font-bold">Cyber</h1>
          <h2 className="text-8xl ml-9 font-bold">Intelligence</h2>
          <p className="mt-10 ml-3 text-5xl">ようこそ、ギーカーの世界へ !</p>
        </div>
      </div>
      <Separator className="border-b-black" />
      <div className="bg-neutral-800 min-h-screen text-white p-8">
        <h1>アプリの説明</h1>
      </div>
      <div className="bg-black min-h-65 text-white">
        <h1>アプリの説明やポリシーを載せる</h1>
      </div>

    </div>
  );
}
