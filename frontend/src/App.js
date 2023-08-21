import React from "react";
import Cookie from "js-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HostMode from "./pages/HostMode";
import Register from "./pages/Register";
import PointsPanel from "./pages/PointsPanel";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HostMode />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="panel" element={<PointsPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
