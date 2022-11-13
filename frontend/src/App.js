// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MyPosts from "./pages/MyPosts/myPosts";
import SpotsPage from "./pages/SpotsPage/SpotsPage";
import FriendsPage from "./pages/Friends/friendsPage";
import HomePage from "./pages/HomePage/HomePage";
// Component Imports
import Navbar from "./components/NavBar/NavBar";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="fullPage">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/spots" element={<SpotsPage />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friendsPage" element={<FriendsPage />} />
      </Routes>
    </div>
  );
}

export default App;
