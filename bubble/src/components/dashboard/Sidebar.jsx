// src/components/Sidebar.js
import React, { Component } from 'react'
import { SidebarLeft, SidebarRight, SidebarEntry } from './SidebarEntry'
import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import MenuIcon from '@material-ui/icons/Menu';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ProfilePage from './pages/Profile/ProfilePage';
import CreateEventPage from './pages/CreateEventPage';
import EventsPage from './pages/EventsPage';

function Sidebar(props) {

    const { setDashboardContent, currDashboardContent, logoutUser } = props

    let [isOpen, setIsOpen] = React.useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-group">
                <SidebarEntry
                    icon={(
                        isOpen
                            ? <MenuOpenRoundedIcon />
                            : <MenuRoundedIcon />)
                    }
                    text="Close"
                    isOpen={isOpen}
                    onClick={toggleSidebar}
                >
                </SidebarEntry>
                <SidebarEntry
                    icon={<AccountCircleOutlinedIcon />}
                    text="Profile"
                    isOpen={isOpen}
                    currDashboardContent={currDashboardContent}
                    dashboardContent={ProfilePage}
                    onClick={() => setDashboardContent(ProfilePage)}
                >
                </SidebarEntry>
                <SidebarEntry
                    icon={<EventNoteOutlinedIcon />}
                    text="Events"
                    isOpen={isOpen}
                    currDashboardContent={currDashboardContent}
                    dashboardContent={EventsPage}
                    onClick={() => setDashboardContent(EventsPage)}
                >
                </SidebarEntry>
                <SidebarEntry
                    icon={<EventAvailableOutlinedIcon />}
                    text="Add Event"
                    isOpen={isOpen}
                    currDashboardContent={currDashboardContent}
                    dashboardContent={CreateEventPage}
                    onClick={() => setDashboardContent(CreateEventPage)}
                >
                </SidebarEntry>
            </div>
            <div className="sidebar-group">
                <SidebarEntry
                    borderTop
                    icon={<ExitToAppOutlinedIcon className="icon" />}
                    text="Log Out"
                    isOpen={isOpen}
                    onClick={() => logoutUser()}
                >
                </SidebarEntry>
            </div>


        </div>)


}

export default Sidebar;