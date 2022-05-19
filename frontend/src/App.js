// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MyPosts from "./pages/MyPosts/myPosts";
import FeedPage from "./pages/FeedPage/feedPage";
import SpotsPage from "./pages/SpotsPage/SpotsPage";
import FriendsPage from "./pages/Friends/friendsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


function App() {
  return (
    <div>
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
        <Route path="/feedPage" element={<FeedPage />} />
        <Route path="/friendsPage" element={<FriendsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
