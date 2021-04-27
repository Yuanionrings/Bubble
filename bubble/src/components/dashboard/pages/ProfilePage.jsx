import { useEffect, useState } from "react";

import { Input, TextField } from '@material-ui/core';

import {
    fetchProfileData,
    editAnyField
} from '../../../actions/userProfileActions'
import { TextFields } from "@material-ui/icons";

function ProfilePage({ }) {

    const [username, setUsername] = useState("")
    const [usernameEdits, setUsernameEdits] = useState("")
    const [usernameChanged, setUsernameChanged] = useState(false)
    const [usernameError, setUsernameError] = useState("")

    const [fullName, setFullName] = useState("")
    const [fullNameEdits, setFullNameEdits] = useState("")
    const [fullNameChanged, setFullNameChanged] = useState(false);
    const [fullNameError, setFullNameError] = useState("")

    const [email, setEmail] = useState("")
    const [emailEdits, setEmailEdits] = useState("")
    const [emailChanged, setEmailChanged] = useState(false);
    const [emailError, setEmailError] = useState("")

    const [passwordLength, setPasswordLength] = useState("")
    const [passwordEdits, setPasswordEdits] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [anyChanged, setAnyChanged] = useState(false);

    useEffect(() => {
        usernameEdits !== username ? setUsernameChanged(true) : setUsernameChanged(false)
        fullNameEdits !== fullName ? setFullNameChanged(true) : setFullNameChanged(false)
        emailEdits !== email ? setEmailChanged(true) : setEmailChanged(false)
    }, [usernameEdits, fullNameEdits, emailEdits, username, fullName, email])

    useEffect(() => {
        setAnyChanged(usernameChanged || fullNameChanged || emailChanged)
    }, [usernameChanged, fullNameChanged, emailChanged])

    useEffect(() => {
        updateProfileData(true);
    }, [/* Mount Effect */])

    const updateProfileData = (resetEdits) => {
        fetchProfileData(resetEdits, receiveProfileData);
    }

    const receiveProfileData = (resetEdits, { fullName, username, email, passwordLength }) => {
        setUsername(username);
        setFullName(fullName);
        setEmail(email);

        if (resetEdits) {
            setUsernameEdits(username);
            setFullNameEdits(fullName);
            setEmailEdits(email);
        }
    }

    const saveChanges = () => {
        usernameChanged && editAnyField("identifier", usernameEdits, setUsernameError, updateProfileData);
        fullNameChanged && editAnyField("fullName", fullNameEdits, setFullNameError, updateProfileData);
        emailChanged && editAnyField("email", emailEdits, setEmailError, updateProfileData);
    }

    return (
        <div className="profile-page">
            <div className="slate-box">
                <h1>Account</h1>
                <hr className="divider"></hr>
                <div className="spaced h-section">
                    <ProfileField
                        label={"Full Name"}
                        value={fullNameEdits}
                        setValue={setFullNameEdits}
                        changed={fullNameChanged}
                        error={fullNameError}>
                    </ProfileField>
                    <ProfileField
                        label={"Username"}
                        value={usernameEdits}
                        setValue={setUsernameEdits}
                        changed={usernameChanged}
                        error={usernameError}>
                    </ProfileField>
                </div>
                <hr className="divider"></hr>
                <div className="spaced h-section">
                    <ProfileField
                        label={"Email"}
                        value={emailEdits}
                        setValue={setEmailEdits}
                        changed={emailChanged}
                        error={emailError}>
                    </ProfileField>
                    <ProfileField
                        label={"Phone Number"}
                        value={""}
                        setValue={() => { }}
                        changed={false}
                        error={""}>
                    </ProfileField>
                </div>
                <hr className="divider"></hr>
                <div className="h-section manga">
                    <button className="slate-btn" onClick={saveChanges} disabled={!anyChanged}>Save Changes</button>
                </div>
            </div>
        </div >
    )
}

function ProfileField(props) {

    const { label, value, setValue, error, changed } = props;

    return (
        <div className="spaced-container">
            <div className="double-label-container">
                <label>{label}</label>
                <label className="extra-info-label">{changed ? "Unsaved Changes" : ""}</label>
            </div>
            <input className="slate-input" value={value} onChange={(event) => setValue(event.target.value)} />
            <div className="error-text">{error}</div>
        </div>
    )
}


export default ProfilePage;