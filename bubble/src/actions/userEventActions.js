import axios from 'axios';

export const eventFunction = (edit, eventObj, setErrors) => {
    axios.post(`http://localhost:4000/events/${edit ? "editEvent" : "createEvent"}`, eventObj)
        .then(res => {
            setErrors({});
            console.log(`${edit ? "Edit" : "Create"} event received:`, res.data);
        })
        .catch(err => {
            console.log(err);
            err && setErrors(prevErrors => ({
                ...err.response.data
            }));
        }
    )
}

export const removeEvent = (eventName, setErrors, loadEvents) => {
    axios.post(`http://localhost:4000/events/removeEvent`, { eventName })
        .then(res => {
            setErrors({});
            console.log(`Delete event received:`, res.data);
        })
        .catch(err => {
            err && setErrors && setErrors(prevErrors => ({
                ...err.response.data
            }));
        }
    )
    loadEvents();
}

export const editEvent = (eventObj, setErrors) => {
    eventFunction(true, eventObj, setErrors)
}

export const createEvent = (eventObj, setErrors) => {
    eventFunction(false, eventObj, setErrors)
}

export const getEvents = (setEvents) => {
    axios.get("http://localhost:4000/events")
        .then(res => {
            setEvents(res.data.events);
        })
        .catch(err => {
            
        }
    )
}