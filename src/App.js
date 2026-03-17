import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Context */
import { AppProvider } from "./context/AppContext";

/* Navbar */
import Navbar from "./components/Navbar";

/* Pages */
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AnalysePrix from "./pages/AnalysePrix";
import AnalyseGeo from "./pages/AnalyseGeo";
import AnalyseDetaillee from "./pages/AnalyseDetaillee";
import About from "./pages/About";

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyse-prix" element={<AnalysePrix />} />
          <Route path="/analyse-geo" element={<AnalyseGeo />} />
          <Route path="/analyse-detaillee" element={<AnalyseDetaillee />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </Router>
    </AppProvider>
  );
}

export default App;