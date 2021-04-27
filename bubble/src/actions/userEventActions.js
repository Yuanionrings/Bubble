import axios from 'axios';

export const createEvent = (eventObj, setErrors) => {
    axios.post("http://localhost:4000/events/createEvent", eventObj)
        .then(res => {
            setErrors({});
            console.log("Create event received:", res.data);
        })
        .catch(err => {
            err && setErrors(prevErrors => ({
                ...err.response.data
            }));
        }
    )
}

export const getEvents = (setEvents) => {
    axios.get("http://localhost:4000/events")
        .then(res => {
            setEvents(res.data.events);
            let events = res.data.events;

        })
        .catch(err => {
            
        }
    )
}