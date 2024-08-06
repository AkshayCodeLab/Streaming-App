import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginErr } from "../Utils/errorSlice";
import axios from "axios";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (name, mail, pass, isSignUp) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/${
      isSignUp ? "register" : "login"
    }`;
    const bodyParams = {
      username: name,
      password: pass,
      ...(isSignUp && { email: mail }),
    };

    try {
      const response = await axios.post(url, bodyParams);
      localStorage.setItem("token", response?.data?.token);
      navigate("/Home");
    } catch (e) {
      const errorString = e.response?.data || "Bad Request";
      dispatch(setLoginErr(errorString));
    }
  };

  return { login };
};

export default useLogin;
