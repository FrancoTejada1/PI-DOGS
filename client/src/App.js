import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage.jsx";
import HomePage from "./components/homePage/homePage.jsx";
import DetailsPage from "./components/detailsPage/detailsPage.jsx";
import CreatePage from "./components/createPage/createPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dogs" element={<HomePage />} />
          <Route path="/dogs/:id" element={<DetailsPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
