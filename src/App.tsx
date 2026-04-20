import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import SBTITest from "@/pages/SBTITest";
import TestResult from "@/pages/TestResult";
import Match from "@/pages/Match";
import Chat from "@/pages/Chat";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<SBTITest />} />
        <Route path="/result" element={<TestResult />} />
        <Route path="/match" element={<Match />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}
