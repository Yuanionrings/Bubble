import axios from 'axios';

export const editAnyField = (changing, changingTo, setError, updateProfileData) => {
    axios.post("http://localhost:4000/profile/changeProfileData", { change: { changing: changing, changingTo } })
        .then(res => {
            updateProfileData(false);
        })
        .catch(err => {
            console.log(err);
            updateProfileData(false);
        })
}

export const fetchProfileData = (resetEdits, setProfileData) => {
    axios.get("http://localhost:4000/profile")
        .then(res => {
            setProfileData(resetEdits, res.data)
        })
        .catch(err => {
        })
}

