import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.min.css"
import { connect } from 'react-redux';

import DashTitle from './DashTitle';
import { logoutUser } from '../../actions/userAuthActions';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            console.log("You are viewing your profile!")
        }
    }

    render(){
        return (
            <div className="dashboard-container">
                <div className="content">
                    <DashTitle page_title='User Dashboard' />
                </div>
                <button onClick={this.props.logoutUser}>Log Out</button>
            </div>
        )
    }


}

const mapStateToProps = state => ({ 
    auth: state.auth,
    errors: state.errors
}); // implied return because obj wrapped in parenthesis

export default connect(mapStateToProps, { logoutUser })(Dashboard);