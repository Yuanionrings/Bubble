import {
    editUsername,
    editEmail,
    fetchProfileData,
    editFullName
} from '../../../../actions/userProfileActions'
import React, { useState, useEffect } from 'react';
import EditableProfileField from './EditableProfileField';

function ProfilePage() {
 

    return (
        <div>
            <Example />
        </div>
    )
}

function Example() {

    useEffect(() => {
        updateProfileData();
    }, [/* Mount Effect */])

    const [errors, setErrors] = useState({})

    const [fullName, setFullname] = useState("")
    const [newFullName, setNewFullName] = useState("")
    const [isEditingFullName, setIsEditingFullName] = useState(false)

    const [username, setUsername] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [isEditingUsername, setIsEditingUsername] = useState(false)

    const [email, setEmail] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [isEditingEmail, setIsEditingEmail] = useState(false)

    const updateProfileData = () => {
        fetchProfileData(receiveProfileData);
    }

    const receiveProfileData = ({fullName, username, email, password}) => {
        setFullname(fullName);
        setUsername(username);
        setEmail(email);
    }

    const stopEditingAll = () => {
        setIsEditingUsername(false);
        setIsEditingFullName(false);
        setIsEditingEmail(false);
        // TODO ...
    }

    return (
        <div>
            <EditableProfileField
                realValue={fullName}
                editValue={newFullName}
                onChange={setNewFullName}
                isBeingEdited={isEditingFullName}
                setBeingEdited={setIsEditingFullName}
                stopEditingAll={stopEditingAll}
                onEditSubmit={() => editFullName(newFullName, setNewFullName, setIsEditingFullName, updateProfileData, setErrors)}
            />
            <EditableProfileField
                realValue={username}
                editValue={newUsername}
                onChange={setNewUsername}                
                isBeingEdited={isEditingUsername}
                setBeingEdited={setIsEditingUsername}
                stopEditingAll={stopEditingAll}
                onEditSubmit={() => editUsername(newUsername, setNewUsername, setIsEditingUsername, updateProfileData, setErrors)}
            />
            <EditableProfileField
                realValue={email}
                editValue={newEmail}
                onChange={setNewEmail}
                isBeingEdited={isEditingEmail}
                setBeingEdited={setIsEditingEmail}
                stopEditingAll={stopEditingAll}
                onEditSubmit={() => editEmail(newEmail, setNewEmail, setIsEditingEmail, updateProfileData, setErrors)}
            />
        </div>
    )
}

export default ProfilePage

