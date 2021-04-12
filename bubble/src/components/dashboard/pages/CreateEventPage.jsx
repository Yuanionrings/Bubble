import React from 'react'
import '../DashboardStyle.scss'
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import axios from 'axios';
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

function CreateEventPage({ }) {
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
                <div className="create-event-page-container">
                    <div className="create-event-page">
                        <div className="create-event-form-container">
                            <h2>Create Event</h2>
                            <TextField
                                error={errors.eventName && true}
                                helperText={errors.eventName}
                                onChange={(event) => setEventName(event.target.value)}
                                className="text-field"
                                color="primary"
                                label="Event Name"
                            >
                            </TextField>
                            <KeyboardDatePicker
                                className="text-field"
                                value={eventDate}
                                onChange={(date) => setEventDate(date)}
                                label="Event Date"
                                minDate={new Date()}
                                format="yyyy/MM/dd"
                            />
                            <KeyboardTimePicker
                                className="text-field"
                                value={startTime}
                                onChange={(time) => setStartTime(time)}
                                label="Start Time"
                                format="hh:mm a"
                            />
                            <KeyboardTimePicker
                                className="text-field"
                                value={endTime}
                                onChange={(time) => setEndTime(time)}
                                label="End Time"
                                format="hh:mm a"
                            />
                            <Button
                                variant="contained"
                                className="button"
                                onClick={onSubmit}
                            > Create Event </Button>
                        </div>
                    </div>
                </div>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    )
}

export default CreateEventPage
