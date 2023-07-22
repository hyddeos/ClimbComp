import React from "react";
import Cookie from "js-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HostMode from "./pages/HostMode";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HostMode />} />
          <Route exact path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
