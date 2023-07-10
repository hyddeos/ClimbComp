import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HostMode from "./pages/HostMode";

function App() {
  return (
    <div>
      <HostMode />
    </div>
  );
}

export default App;
