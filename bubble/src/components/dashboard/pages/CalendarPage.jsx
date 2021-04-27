import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState, resource } from '@devexpress/dx-react-scheduler';
import { Scheduler, Appointments, CurrentTimeIndicator, DayView, WeekView, MonthView } from '@devexpress/dx-react-scheduler-material-ui';

import '../DashboardStyle.scss'

import { getEvents } from '../../../actions/userEventActions'


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var today = yyyy + '-' + mm + '-' + dd;

var currentDate = today;
var schedulerData = [
    { startDate: today + 'T10:00', endDate: today + 'T10:30', title: 'Yoink' },
    { startDate: today + 'T13:00', endDate: today + 'T20:00', title: 'Code' },
    { startDate: today + 'T17:00', endDate: today + 'T18:00', title: 'Dinner' },
];

function CalendarPage({ }) {
    const [events, setEvents] = useState([])
    const [schedulerData, setSchedulerData] = useState([])

    useEffect(() => {
        loadEvents();
    }, [])

    useEffect(() => {
        let data = [];
        for (let event of events) {
            let {eventName, startTime, endTime} = event;
            data.push({startDate: startTime, endDate: endTime, title: eventName })
        }
        console.log(data)
        setSchedulerData(data);
    }, [events])
    
    const loadEvents = () => {
        getEvents(setEvents);
    }

    return (
        <div className="events-page-calendar">
            <div className="event-base-container">
                <Paper>
                    <Scheduler data={schedulerData} showCurrentTimeIndicato={true}>
                        {/* <ViewState 
                            currentDate={currentDate}
                        /> */}

                        <WeekView
                            startDayHour={0}
                            endDayHour={23}
                        />

                        <Appointments />

                        <CurrentTimeIndicator
                        //indicatorComponent={10}
                        />
                    </Scheduler>
                </Paper>
            </div>
        </div>
    )
}

export default CalendarPage
