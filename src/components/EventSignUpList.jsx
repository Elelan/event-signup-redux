import React, { useContext } from 'react';

// Actions and redux
import { actions } from '../reducers/eventReducer';
import { StoreContext, createAction } from '../reducers/reducers';

const EventSignUpList = () => {
    const [state, dispatch] = useContext(StoreContext);
    const eventAttendees = state.events.eventAttendees;

    return (
        <div className="box">
            {
                eventAttendees && eventAttendees.length ?
                    <>
                        <h2 className="subtitle is-size-5">Hurrah, {eventAttendees.length} {eventAttendees.length > 1 ? "people have" : "person has"} signed up to our event!</h2>
                        <table className="table is-striped is-fullwidth">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Attending</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                eventAttendees.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.number}</td>
                                        <td><span className={`has-text-${item.attending ? 'success' : 'danger'}`}>{item.attending ? "Yes" : "No"}</span></td>
                                        <td>
                                            <div className="buttons">
                                                <button className="button is-info is-small" onClick={() => dispatch(createAction(actions.TOGGLE_ATTENDANCE, {id: item.id, attending: !item.attending}))}>change attendance</button>
                                                <button className="button is-danger is-small" onClick={() => dispatch(createAction(actions.DELETE_ATTENDEE, item.id))}>delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </>
                    : <h2>Oh dear...looks like no one has signed up yet :(</h2>
            }
        </div>
    );
};

export default EventSignUpList;