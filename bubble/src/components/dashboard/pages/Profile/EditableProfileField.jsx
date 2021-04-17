import React, { useState, useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Input, TextField } from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

function EditableProfileField(props) {
    let textFieldRef = useRef(null);
    let { stopEditingAll, editValue, realValue, isBeingEdited, setBeingEdited, onChange, onEditSubmit } = props;

    useEffect(() => {
        isBeingEdited && textFieldRef.current && textFieldRef.current.focus();
    }, [isBeingEdited])

    function cancelEditing() {
        setBeingEdited(false);
        onChange("");
    }

    return (
        <div className="editable-profile-field">
            {!isBeingEdited ? (
                <label onClick={() => {
                    stopEditingAll();
                    setBeingEdited(true)
                }}>{realValue}</label>
            ) : (
                <ThemeProvider theme={theme}>
                    <TextField className="editable-text-field"
                       // onBlur={() => cancelEditing()}
                        variant="outlined"
                        inputRef={textFieldRef}
                        size="small"
                        value={editValue}
                        onChange={(event) => onChange(event.target.value)}
                        onKeyDown={({ key }) => key === "Escape" && cancelEditing() || key === "Enter" && onEditSubmit()}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => onEditSubmit()}
                                        edge="end"
                                    >
                                        <CheckIcon className="checkIcon" />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => cancelEditing()}
                                        edge="end"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                </ThemeProvider>
            )}
        </div>
    )
}

export default EditableProfileField;