import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        email: email,
        password: password,
      })
      .catch((error) => {
        alert(error.response.data.message);
        setIsLoading(false);
      });
    const json = await response.data;

    if (json) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
}

export default useLogin;
