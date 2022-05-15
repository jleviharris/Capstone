import { createContext, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const BASE_URL = "http://localhost:3007/api/users";
  const decodedUser = localStorage.getItem("token");
  const decodedToken = decodedUser ? jwtDecode(decodedUser) : null;
  const [user, setUser] = useState(() => decodedToken);
  const [isServerError, setIsServerError] = useState(false);
  const [file, setFile] = useState();

  const navigate = useNavigate();

  

  const registerUser = async (registerData) => {
    try {
      let response = await axios.post(`${BASE_URL}/register`, registerData);
      if (response.status === 200) {
        let token = response.headers["x-auth-token"];
        localStorage.setItem("token", JSON.stringify(token));
        setUser(jwtDecode(token));
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (loginData) => {
    try {
      let response = await axios.post(`${BASE_URL}/login`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data));
        setUser(jwtDecode(response.data));
        console.log(localStorage.getItem("token"))
        setIsServerError(false);
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.message);
      setIsServerError(true);
    }
  };

  const logoutUser = async () => {
      navigate("/");
      localStorage.removeItem("token");
      console.log("token removed");
      setUser(null);
      setFile(null);
    }
  

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
    file,
    setFile
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
