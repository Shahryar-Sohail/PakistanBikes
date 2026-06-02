import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CompareProvider } from "./context/CompareContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/user/home/Home";
import Compare from "./pages/user/Compare";
import BikeDetail from "./pages/user/bike-detail/BikeDetail";
import PriceTracker from "./pages/user/PriceTracker";
import BikeFinderQuiz from "./pages/user/BikeFinderQuiz";
import About from "./pages/user/About";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <CompareProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/price-tracker" element={<PriceTracker />} />
          <Route path="/bike-finder-quiz" element={<BikeFinderQuiz />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bike/:id" element={<BikeDetail />} />
        </Routes>
        <Footer />
      </CompareProvider>
    </AuthProvider>
  );
}

export default App;
