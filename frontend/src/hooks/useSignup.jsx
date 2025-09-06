import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
export const useSignup = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (formdata) => {
        const { username, email, phone, name, password } = formdata;
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post("http://localhost:8000/api/auth/signup", { username, email, phone, name, password });
            if (response.status !== 201) {
                throw new Error("Signup failed");
            }
            const user = response.data;
            dispatch({ type: "LOGIN", payload: user });
            localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed");
        } finally {
            setIsLoading(false);
        }
    };
    return { signup, error, isLoading };
};
