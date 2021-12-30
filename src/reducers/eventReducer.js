import { createSlice} from "@reduxjs/toolkit";
import uuid from 'react-uuid';

// Data
import appState from '../data/initialState';

export const eventSlice = createSlice({
    name: 'events',
    initialState: appState.events,
    reducers: {
        addEventAttendee: (state, action) => {
            const newId = uuid();
            const newAttendee = action.payload;
            newAttendee.id = newId;
            state.eventAttendees.push(newAttendee);
            state.loading = false;
        },
        toggleEventAttendance: (state, action) => {
            const itemToUpdate = state.eventAttendees.find(item => item.id === action.payload);
            itemToUpdate.attending = !itemToUpdate.attending;
            state.loading = false;
        },
        deleteEventAttendee: (state, action) => {
            state.loading = false;
            state.eventAttendees = state.eventAttendees.filter(item => item.id !== action.payload);
        }
    }
});

export const { addEventAttendee, toggleEventAttendance, deleteEventAttendee } = eventSlice.actions;

export const selectAttendees = state => state.events.eventAttendees;

export default eventSlice.reducer;