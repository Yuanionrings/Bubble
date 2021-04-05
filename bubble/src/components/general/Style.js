import React, { Component } from 'react';
import { loginUser } from '../../actions/userAuthActions';
import { connect } from 'react-redux';
import './StyleSheet.css'

class Style extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        return (
            <div>
                <div className='full-screen-container'>
                    <div className='form-container'>
                        <h3>Welcome</h3>
                        <form onSubmit={(e) => {e.preventDefault()}}>
                            <div className='input-group'>
                                <input type='text'
                                    placeholder='Username'
                                    id='username'
                                    className='text-input'
                                />
                                <div className='err-tooltip'>Unknown User</div>
                            </div>


                            <div className='input-group'>
                                <input type='password'
                                    placeholder='Password'
                                    id='password'
                                    className='text-input'
                                />
                                <div className='err-tooltip'>You are gay</div>
                            </div>

                            <input type="submit" className='btn btn-red btn-border-pop' value='Log In' />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Style;