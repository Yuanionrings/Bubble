import React from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState, resource} from '@devexpress/dx-react-scheduler';
import {Scheduler, Appointments, CurrentTimeIndicator, DayView, WeekView, MonthView} from '@devexpress/dx-react-scheduler-material-ui';

import '../DashboardStyle.scss'

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm =  String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var today = yyyy + '-' + mm + '-' + dd;


var currentDate = today;
var schedulerData = [
    { startDate: today + 'T10:00', endDate: today + 'T10:30', title: 'Yoink'},
    { startDate: today + 'T13:00', endDate: today + 'T20:00', title: 'Code' },
    { startDate: today + 'T17:00', endDate: today + 'T18:00', title: 'Dinner'},
];

function EventsPage({ }) {
        return (
            <div className="event-base-container">
                <Paper>
                    <Scheduler data={schedulerData} showCurrentTimeIndicato={true}>
                        {/* <ViewState 
                            currentDate={currentDate}
                        /> */}

                        <WeekView 
                            startDayHour={9} 
                            endDayHour={21}
                        />

                        <Appointments />

                        <CurrentTimeIndicator
                            //indicatorComponent={10}
                        />
                    </Scheduler>
                </Paper>
            </div>
            
        )
}

export default EventsPage
