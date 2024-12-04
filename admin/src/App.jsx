import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Donations from "./pages/Donations";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="donation" element={<Donations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
