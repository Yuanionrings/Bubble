import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getEvents } from '../../../actions/userEventActions'

function EventsPage(props) {
    const { } = props

    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents(setEvents);
    }, [])

    return (
        <div className="events-page">
            <div className="slate-box">
                <h1>Events</h1>
                <hr />
                <div className="v-section">
                    {events.map(event => <EventView {...event} />)}
                </div>
            </div>
        </div>
    )
}

function EventView({ eventName, eventDate, startTime, endTime }) {    
    return (
        <div className="h-section center-content">
            <div className="event-container">
                <h3>{eventName}</h3>
                <p>{eventDate}</p>
                <p>{startTime}</p>
                <p>{endTime}</p>
                <div className="h-section manga">dd</div>
            </div>
        </div>
    )
}



export default EventsPage
