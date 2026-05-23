import { AuthProvider } from "./context/AuthContext";
import { CompareProvider } from "./context/CompareContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/user/Home";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <CompareProvider>
        <Navbar />
        <main>
          <Home />
        </main>
        <Footer />
      </CompareProvider>
    </AuthProvider>
  );
}

export default App;
