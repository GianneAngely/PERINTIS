import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SmartKostFinder from "./pages/SmartKostFinder";
import Roommate from "./pages/Roommate";
import KostOwner from "./pages/KostOwner";
import TagihanKost from "./pages/TagihanKost";
import Forum from "./pages/Forum";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="smart-kost-finder" element={<SmartKostFinder />} />
        <Route path="roommate" element={<Roommate />} />
        <Route path="kost-owner" element={<KostOwner />} />
        <Route path="tagihan-kost" element={<TagihanKost />} />
        <Route path="forum" element={<Forum />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
