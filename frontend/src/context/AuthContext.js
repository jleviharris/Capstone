import { createContext, useEffect, useState } from "react";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

import AxiosOnlineStatus from "../Routes/status";
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

  useEffect(() => {
    if (user !== null) {
      AxiosOnlineStatus.online(user._id);
    }
  }, [user]);

  const registerUser = async (registerData) => {
    const form = new FormData();
    form.append("name", registerData.name);
    form.append("email", registerData.email);
    form.append("password", registerData.password);
    form.append("isAdmin", registerData.isAdmin);
    form.append("image", file);
    for(var pair of form.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
   }
    try {
      let response = await axios.post(`${BASE_URL}/register`, form);
      if (response.status === 200) {
        let token = response.headers["x-auth-token"];
        localStorage.setItem("token", JSON.stringify(token));
        setUser(jwtDecode(token));
        console.log(localStorage.getItem("token"))
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
    if (user) {
      try {
        await AxiosOnlineStatus.offline(user._id);
      } catch (error) {
        console.log("Error changing offline status: " + error);
      }
      navigate("/");
      localStorage.removeItem("token");
      console.log("token removed");
      setUser(null);
      setFile(null);
    }
  };

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
