import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { navItems } from "./nav-items";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar isCollapsed={isCollapsed} toggleCollapse={handleCollapse} />
          <main
            className={`w-full md:ml-[240px] p-8 transition-all duration-300 ${
              isCollapsed ? "md:ml-16" : "md:ml-[240px]"
            }`}
          >
            <Routes>
              {navItems.map((item) => (
                <Route key={item.to} path={item.to} element={item.page} />
              ))}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
