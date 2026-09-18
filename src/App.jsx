import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Geriatric from "./pages/ptClasses/Geriatric";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/geriatric" element={<Geriatric />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;