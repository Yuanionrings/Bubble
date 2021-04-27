import React from 'react'
import '../DashboardStyle.scss'
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker,
} from '@material-ui/pickers';

import Button from '@material-ui/core/button';
import { createEvent } from '../../../actions/userEventActions';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

const useStyles = makeStyles({
    root: {
        // Borders
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            fontFamily: "Slate Bold",
            boxSizing: "border-box",
            border: "none",
            boxShadow: "0 0 0.1rem inset rgb(144, 144, 144)",
            borderRadius: "0.2rem",
            fontSize: "1.1rem",
            width: "100%",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            boxShadow: "0 0 0.05rem 0.1rem inset black",
            transitionDuration: "100ms",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
        },

        // Text
        "& .MuiOutlinedInput-input": {
            fontFamily: "Slate",
            color: "black"
        },


        // Labels
        "& .MuiInputLabel-outlined": {
            color: "green"
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "red"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "purple"
        },

    }
});

function CreateEventPage({ }) {
    const classes = useStyles();

    const [eventName, setEventName] = React.useState(null);
    const [eventDate, setEventDate] = React.useState(new Date());
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);
    const [errors, setErrors] = React.useState({});

    const onSubmit = () => {
        createEvent({
            eventName: String(eventName),
            eventDate: String(eventDate),
            startTime: String(startTime),
            endTime: String(endTime),
        }, setErrors);
    }

    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="create-event-page">
                    <div className="slate-box">
                        <h1>Create Event</h1>
                        <hr className="divider"></hr>
                        <div className="h-section spaced">
                            <CreateEventField
                                label="Event Name"
                                error={errors.eventName}
                                MuiElement={<TextField onChange={(event) => setEventName(event.target.value)} />}
                            />
                            <CreateEventField
                                label="Event Date"
                                MuiElement={
                                    <KeyboardDatePicker
                                        inputVariant="outlined"
                                        value={eventDate}
                                        onChange={(date) => setEventDate(date)}
                                        minDate={new Date()}
                                        format="yyyy/MM/dd"
                                    />}
                            />
                        </div>
                        <hr className="divider"></hr>
                        <div className="h-section spaced">
                            <CreateEventField
                                label="Start Time"
                                MuiElement={
                                    <KeyboardTimePicker
                                        inputVariant="outlined"
                                        value={startTime}
                                        onChange={(time) => setStartTime(time)}
                                        format="hh:mm a"
                                    />}
                            />
                            <CreateEventField
                                label="End Time"
                                MuiElement={
                                    <KeyboardTimePicker
                                        inputVariant="outlined"
                                        value={endTime}
                                        onChange={(time) => setEndTime(time)}
                                        format="hh:mm a"
                                    />}
                            />
                        </div>
                        <hr className="divider"></hr>
                        <div className="h-section manga normal-margin">
                            <button className="slate-btn" onClick={onSubmit}>Create Event</button>
                        </div>
                    </div>
                </div>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    )
}

function CreateEventField(props) {
    let classes = useStyles();
    let { MuiElement, label, error } = props;
    return (
        <div className="spaced-container">
            <div className="double-label-container">
                <label>{label}</label>
            </div>
            <MuiElement.type
                variant="outlined"
                className={classes.root}
                size="small"
                {...MuiElement.props}
            ></MuiElement.type>
            <div className="error-text">{error}</div>
        </div>

    )
}

export default CreateEventPage
