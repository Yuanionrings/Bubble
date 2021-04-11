import React, { Component } from 'react';

import { connect } from 'react-redux';

import { logoutUser } from '../../actions/userAuthActions';
import ProfilePage from './pages/ProfilePage';
import Sidebar from './Sidebar';
import Homebar from './Homebar';

import "./DashboardStyle.scss"

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

    render(){
        let { logoutUser } = this.props;
        let { pageContent: PageContent } = this.state;
        return (
            <div className="main-container">
                <Homebar/>
                <Sidebar logoutUser={logoutUser}setDashboardContent={this.setDashboardContent}/>
                
                <div className="content-container">
                    <div className="content">
                        <PageContent/>
                    </div>
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