import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, {
        email: email,
        password: password,
      })
      .catch((error) => {
        alert(error.response.data.message);
        setIsLoading(false);
      });
    const json = await response.data;

    if (json) {
      alert("Registered successfully. Please login to continue.");
      navigate("../");
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
}

export default useSignup;
