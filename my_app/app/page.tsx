import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,} from "@/components/ui/menubar";

export default function Home() {
  return (
    <div>
      <div>
        <Menubar className="flex justify-end space-x-6">
          <MenubarMenu>
            <MenubarTrigger>Top</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>App</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                HackMap
              </MenubarItem>
              <MenubarItem>
                The Cyber World
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Find Community</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Search the web</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Find...</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Login</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Create Account</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>

      <div>背景の挿入</div>
    </div>
  );
}
