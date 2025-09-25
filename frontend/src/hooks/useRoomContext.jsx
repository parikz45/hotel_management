import { useContext } from "react";
import { RoomsContext } from "../context/RoomsContext";
import { useState } from "react";
import axios from "axios";

export const useRoomContext = () => {
    const context = useContext(RoomsContext);
    const [rooms, setRooms] = useState([]);
    if (!context) {
        throw new Error("useRoomContext must be used within a RoomsProvider");
    }
    return context;

    // fetch all rooms
    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/rooms");
            setRooms(response.data);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };
    return { rooms, fetchRooms };
};