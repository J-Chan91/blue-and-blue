import Image from "next/image";

import LoginSection from "./LoginSection";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export default function NavBar() {
  return (
    <nav className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white/40 px-72 py-3 backdrop-blur-lg max-lg:px-10 max-sm:hidden">
      <div className="flex items-center gap-2">
        <Image
          src="https://i.pinimg.com/736x/62/23/d6/6223d6f82d5650e92e30e4d62b480177.jpg"
          alt="logo"
          width={50}
          height={50}
        />
      </div>

      <div className="flex items-center gap-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>옷</NavigationMenuTrigger>

              <NavigationMenuContent className="px-10 py-2">
                <ul className="flex flex-col gap-4">
                  <li className="text-left">hihi</li>
                  <li>hihi</li>
                  <li>hihi</li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <LoginSection />
      </div>
    </nav>
  );
}
