import { createContext, useReducer } from "react";

// Create the context
export const RoomsContext = createContext();

// Define the reducer
export const roomsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ROOMS':
            return { ...state, rooms: action.payload };
        case 'ADD_ROOM':
            return { ...state, rooms: [...state.rooms, action.payload] };
        case 'UPDATE_ROOM':
            const updatedRooms = state.rooms.map(room =>
                room._id === action.payload._id ? action.payload : room
            );
            return { ...state, rooms: updatedRooms };
        case 'DELETE_ROOM':
            return { ...state, rooms: state.rooms.filter(room => room._id !== action.payload) };
        default:
            return state;
    }
};

// Create the provider component
export const RoomsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(roomsReducer, { rooms: null });

    return (
        <RoomsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RoomsContext.Provider>
    );
};