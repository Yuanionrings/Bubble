import axios from 'axios';

export const editUsername = (newUsername, setNewUsername, setIsEditing, updateData, setErrors) => {

}

export const editEmail = (newEmail, setNewEmail, setIsEditing, updateData, setErrors) => {
    axios.post("http://localhost:4000/profile/setEmail", { email: newEmail } )
    .then(res => {
        console.log(res.data);
        setTimeout(() => setIsEditing(false), 250);
        updateData();
    })
    .catch(err => {

    })
}

export const editFullName = (newFullName, setNewFullName, setIsEditing, updateData, setErrors) => {
    axios.post("http://localhost:4000/profile/setFullName", { fullName: newFullName } )
        .then(res => {
            console.log(res.data);
            setTimeout(() => setIsEditing(false), 250);
            updateData();
        })
        .catch(err => {

        })
}

export const fetchProfileData = (setProfileData) => {
    axios.get("http://localhost:4000/profile")
        .then(res => {
            setProfileData(res.data)
        })
        .catch(err => {

        })
}

