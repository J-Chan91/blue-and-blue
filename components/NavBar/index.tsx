import Image from "next/image";

import LoginSection from "./LoginSection";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Link from "next/link";

const NavList = [
  {
    triggerName: "단독",
    subMenu: [
      { title: "그것만 팔아요", link: "/this" },
      { title: "저것만 팔아요", link: "/that" },
    ],
  },
];

export default function NavBar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white/40 px-14 py-3 backdrop-blur-lg max-lg:px-10 max-sm:hidden">
      <div className="flex items-center gap-2">
        <Image
          alt="logo"
          src="https://i.pinimg.com/736x/62/23/d6/6223d6f82d5650e92e30e4d62b480177.jpg"
          priority={true}
          width={50}
          height={50}
          style={{ width: "auto", height: "auto" }}
        />
      </div>

      <div className="flex items-center gap-10">
        <NavigationMenu>
          <NavigationMenuList>
            {NavList.map((navItem) => (
              <NavigationMenuItem key={navItem.triggerName}>
                <NavigationMenuTrigger className="font-bold tracking-tighter text-gray-800">
                  {navItem.triggerName}
                </NavigationMenuTrigger>

                <NavigationMenuContent className="py-1">
                  <ul className="flex w-[400px] flex-col gap-2">
                    {navItem.subMenu.map((item) => (
                      <Link
                        href={item.link}
                        className="p-2 text-sm transition-all hover:bg-gray-100"
                        key={item.link}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <LoginSection />
      </div>
    </nav>
  );
}
