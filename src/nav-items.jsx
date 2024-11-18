import {
  HomeIcon,
  ClockIcon,
  ShoppingBagIcon,
  GiftIcon,
  UserIcon,
} from "lucide-react";
import Index from "./pages/index";
import ForYou from "./pages/for-you";
import Sell from "./pages/sell";
import Donate from "./pages/donate";
import Settings from "./pages/settings";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "For You",
    to: "/for-you",
    icon: <ClockIcon className="h-4 w-4" />,
    page: <ForYou />,
  },
  {
    title: "Sell",
    to: "/sell",
    icon: <ShoppingBagIcon className="h-4 w-4" />,
    page: <Sell />,
  },
  {
    title: "Donate",
    to: "/donate",
    icon: <GiftIcon className="h-4 w-4" />,
    page: <Donate />,
  },
  {
    title: "Me",
    to: "/settings",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Settings />,
  },
];
