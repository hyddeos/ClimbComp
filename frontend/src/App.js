import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <Route exact path="competition" element={<PointsPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
