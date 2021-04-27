import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getEvents, removeEvent } from '../../../actions/userEventActions'

import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { IconButton } from '@material-ui/core';
import CreateEventPage from './CreateEventPage';
import { militaryToRegular } from '../../../util/timeUtil';

function EventsPage({setDashboardContent}) {
    const [events, setEvents] = useState([])

    useEffect(() => {
        loadEvents();
    }, [])

    const loadEvents = () => {
        getEvents(setEvents);

    }

    return (
        <div className="events-page">
            <div className="slate-box">
                <h1>Events</h1>
                <hr />
                <div className="v-section">
                    {events.map(event => <EventView key={event.eventName} event={event} loadEvents={loadEvents} setDashboardContent={setDashboardContent}/>)}
                </div>
            </div>
        </div>
    )
}

function EventView({ event, event: { eventName, eventDate, startTime, endTime }, loadEvents, setDashboardContent }) {
    startTime = militaryToRegular(`${startTime.getHours()}:${startTime.getMinutes()}`)
    endTime = militaryToRegular(`${endTime.getHours()}:${endTime.getMinutes()}`)
    let [month, day, year] = String(eventDate).split(' ');
    eventDate = `${month} ${day} ${year}`
    return (
        <div className="h-section center-content">
            <div className="event-container">
                <h3>{eventName}</h3>
                <p>{eventDate}</p>
                <p>{startTime}</p>
                <p>{endTime}</p>
                <div className="h-section manga">
                    <div className="icon-container">
                        <IconButton onClick={() => {setDashboardContent(<CreateEventPage editingEvent={event} setDashboardContent={setDashboardContent}/>)}}>
                            <EditOutlinedIcon className="icon"></EditOutlinedIcon>
                        </IconButton>
                    </div>
                    <div className="icon-container">
                        <IconButton onClick={() => removeEvent(eventName, loadEvents)}>                        
                        <DeleteIcon className="icon"></DeleteIcon>
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default EventsPage
