import axios from 'axios';

export const eventFunction = (edit, eventObj, setErrors, onSuccess) => {
    axios.post(`http://localhost:4000/events/${edit ? "editEvent" : "createEvent"}`, eventObj)
        .then(res => {
            setErrors({});
            console.log(`${edit ? "Edit" : "Create"} event received:`, res.data);
            onSuccess();
        })
        .catch(err => {
            console.log(err);
            err && setErrors(prevErrors => ({
                ...prevErrors,
                ...err.response.data
            }));
        }
    )
}

export const removeEvent = (eventName, loadEvents) => {
    axios.post(`http://localhost:4000/events/removeEvent`, { eventName })
        .then(res => {
            console.log(`Delete event received:`, res.data);
            loadEvents();
        })
        .catch(err => {
            console.log(err);

        }
    )
}

export const editEvent = (eventObj, setErrors, onSuccess) => {
    eventFunction(true, eventObj, setErrors, onSuccess)
}

export const createEvent = (eventObj, setErrors, onSuccess) => {
    eventFunction(false, eventObj, setErrors, onSuccess)
}

export const getEvents = (setEvents) => {
    axios.get("http://localhost:4000/events")
        .then(res => {
            for (let event of res.data.events) {
                [event.eventDate, event.startTime, event.endTime] = [new Date(event.eventDate), new Date(event.startTime), new Date(event.endTime)]
            }
            setEvents(res.data.events);
        })
        .catch(err => {
            
        }
    )
}