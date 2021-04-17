import React, { Component } from 'react';

import { connect } from 'react-redux';

import { logoutUser } from '../../actions/userAuthActions';
import ProfilePage from './pages/Profile/ProfilePage';
import Sidebar from './Sidebar';
import Homebar from './Homebar';

import "./DashboardStyle.scss"
import { Home } from '@material-ui/icons';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            pageContent: ProfilePage,
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            console.log("You are viewing your profile!")
        }

    }

    setDashboardContent = (content) => {
        this.setState({
            pageContent: content,
        })
    }

    render() {
        let { logoutUser } = this.props;
        let { pageContent: PageContent } = this.state;
        return (
            <div className="fullscreen-container">
                <Homebar />
                <div className="main-container">
                    <Sidebar
                        logoutUser={logoutUser}
                        currDashboardContent={this.state.pageContent}
                        setDashboardContent={this.setDashboardContent} />
                    <PageContent />
                </div>
            </div>

        )

        //  <button onClick={this.props.logoutUser}>Log Out</button>
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);