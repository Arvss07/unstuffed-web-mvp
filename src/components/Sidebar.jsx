import {
  HomeIcon,
  ClockIcon,
  ShoppingBagIcon,
  GiftIcon,
  UserIcon,
  LogOutIcon,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const navItems = [
    { icon: <HomeIcon size={30} />, label: "Browse", path: "/" },
    { icon: <ClockIcon size={30} />, label: "For You", path: "/for-you" },
    { icon: <ShoppingBagIcon size={30} />, label: "Sell", path: "/sell" },
    { icon: <GiftIcon size={30} />, label: "Donate", path: "/donate" },
    { icon: <UserIcon size={30} />, label: "Me", path: "/settings" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle Sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-100 p-2 rounded-md bg-[#0288D1] text-white md:hidden"
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen ${
          isCollapsed ? "w-16" : "w-[240px]"
        } bg-[#0288D1] text-white flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo and Collapse Button (Top Section) */}
        <div className="flex items-center justify-between p-6 mb-8 mt-12 md:mt-0">
          <div>
            {!isCollapsed && (
              <>
                <h1 className="text-2x1 font-bold">Unstuffed</h1>
                <p className="text-sm opacity-80">Sell, Share, Sustain</p>
              </>
            )}
          </div>
          <button onClick={toggleCollapse} className="md:block hidden">
            {isCollapsed ? (
              <ChevronRight size={30} />
            ) : (
              <ChevronLeft size={30} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-6 py-4 hover:bg-white/10 transition-colors ${
                location.pathname === item.path ? "bg-white/20" : ""
              }`}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button (Bottom Section) */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-4 hover:bg-white/10 transition-colors mb-4"
        >
          <LogOutIcon size={30} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Overlay for mobile*/}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
