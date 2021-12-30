import uuid from 'react-uuid';

// Actions
export const actions = {
    ADD_ATTENDEE: 'add event attendee',
    TOGGLE_ATTENDANCE: 'change attendance',
    DELETE_ATTENDEE: 'delete attendance'
};

// Reducer
const eventReducer = (state, action) => {
    switch (action.type) {
        case actions.ADD_ATTENDEE: {
            const newAttendee = action.payload;
            newAttendee.id = uuid();
            newAttendee.attending = true;

            return {
                ...state,
                eventAttendees: [
                    ...state.eventAttendees,
                    newAttendee
                ],
                loading: false
            };
        }
        case actions.TOGGLE_ATTENDANCE: {
            const updatedEventAttendee = state.eventAttendees.map(item => {
                if (item.id === action.payload.id) {
                    item.attending = action.payload.attending;
                }
                return item;
            });
            return {
                ...state,
                eventAttendees: updatedEventAttendee,
                loading: false
            };
        }

        case actions.DELETE_ATTENDEE: {
            const updatedEventAttendees = state.eventAttendees.filter(item => item.id !== action.payload);
            return {
                ...state,
                eventAttendees: updatedEventAttendees,
                loading: false
            };
        }
        default:
            return state;
    }
}

export default eventReducer;