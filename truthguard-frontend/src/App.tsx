import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { VerifyPage } from "./pages/VerifyPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/verify" element={<VerifyPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
