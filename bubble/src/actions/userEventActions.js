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