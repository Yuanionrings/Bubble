import React, { useEffect } from 'react'
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
import { createEvent, editEvent } from '../../../actions/userEventActions';
import { regularToMilitary } from '../../../util/timeUtil';
import EventsPage from './EventsPage';

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

function CreateEventPage({ editingEvent, setDashboardContent }) {
    const [eventName, setEventName] = React.useState("");
    const [eventDate, setEventDate] = React.useState(new Date());
    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date());
    const [errors, setErrors] = React.useState({});

    const action = (editingEvent ? "Edit" : "Create") + " Event";

    useEffect(() => {
        if (editingEvent) {
            let { eventName, eventDate, startTime, endTime } = editingEvent;
            setEventName(eventName)
            setEventDate(eventDate)
            let [startHour, startMin] = regularToMilitary(startTime);
            setStartTime(new Date(1, 1, 1, startHour, startMin))
            let [endHour, endMin] = regularToMilitary(endTime);
            setEndTime(new Date(1, 1, 1, endHour, endMin))
        }

    }, [])

    const onSubmit = () => {
        let data = {
            eventName: String(eventName),
            eventDate: String(eventDate),
            startTime: String(startTime),
            endTime: String(endTime),
        }
        !editingEvent ? createEvent(data, setErrors) : editEvent({ editing: editingEvent.eventName, ...data }, setErrors);
        setTimeout(() => setDashboardContent(<EventsPage/>), 100)
    }

    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="create-event-page">
                    <div className="slate-box">
                        <h1>{action}</h1>
                        <hr className="divider"></hr>
                        <div className="h-section spaced">
                            <CreateEventField
                                label="Event Name"
                                error={errors.eventName}
                                MuiElement={<TextField value={eventName} onChange={(event) => setEventName(event.target.value)} />}
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
                            <button className="slate-btn" onClick={onSubmit}>{action}</button>
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
