import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);
        try {
            // const response = await axios.post("http://localhost:8000/api/auth/login", { username, password });
            const response = await axios.post("http://localhost:8000/api/auth/login", { username, password });
            if (response.status !== 200) {
                throw new Error("Login failed");
            }
            const user = response.data;
            dispatch({ type: "LOGIN", payload: user });
            localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };
    return { login, error, isLoading };
};
