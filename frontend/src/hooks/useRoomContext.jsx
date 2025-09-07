import { useContext } from "react";
import { RoomsContext } from "../context/RoomsContext";

export const useRoomContext = () => {
    const context = useContext(RoomsContext);
    if (!context) {
        throw new Error("useRoomContext must be used within a RoomsProvider");
    }
    return context;
};