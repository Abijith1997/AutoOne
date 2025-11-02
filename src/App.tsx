import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Header } from "./navigation/Header";
import { Home } from "./pages/Home";
import { Car } from "./pages/Car";
import { Footer } from "./navigation/Footer";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="mt-24 px-4 sm:px-8 flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Car />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
