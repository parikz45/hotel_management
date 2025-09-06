import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);
    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
}
