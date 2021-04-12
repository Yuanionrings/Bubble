import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import { IconButton } from '@material-ui/core';

export function SidebarEntry(props) {
    let { icon: Icon, onClick } = props;
    let IconComponent = Icon.type;
    return (
        <div className="sidebar-tab">
            <EntryDescription {...props} />
            <div className="link">
                <IconButton onClick={onClick} className="icon-button">
                    <IconComponent {...Icon.props} className="sidebar-icon"></IconComponent>
                </IconButton>
            </div>
        </div>
    )
}

function EntryDescription(props) {

    const sidebarStyle = {
        transition: `padding 150ms, width 150ms, background-color 250ms linear, border 50ms linear`
    }

    const sidebarTransitionStyles = {
        entering: { width: '0rem', paddingRight: '0rem' },
        entered: { width: '9rem', paddingRight: '0.6rem' },
        exiting: { width: '9rem', paddingRight: '0.6rem' },
        exited: { width: '0rem', paddingRight: '0rem' }
    }

    let { text, isOpen, onClick } = props

    return (
        <Transition in={isOpen} timeout={100}>
            {(state) => (
                <div className="description" onClick={onClick} style={{
                    ...sidebarStyle,
                    ...sidebarTransitionStyles[state]
                }}>
                    {text}
                </div>
            )}
        </Transition>
    )
}
