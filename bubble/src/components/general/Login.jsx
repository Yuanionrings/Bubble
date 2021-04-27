import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import clearAuthErrors from '../../util/clearAuthErrors'

import { loginUser } from '../../actions/userAuthActions';

import loginImg from "../../resources/soap.png";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
        }
    }

    componentDidMount() {
        this.props.clearAuthErrors();
        if (this.props.auth.isAuthenticated) {
            console.log("You are already logged in! Congrats!")
            this.props.history.push('/dashboard');
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            let errors = this.props.errors;
            for (let key in errors)
                if (this.state[key] && errors['resetField'])
                    this.setState({ [key]: "" })
        }
    }

    // If you need to do something with the new state value right after you change it, use callback (example below)
    onChange = (event) => this.setState({ [event.target.id]: event.target.value }, () => { /* Callback example */ })

    onSubmit = (event) => {
        // Prevent Default Page Refesh
        event.preventDefault()

        const userData = {
            username: this.state.username,
            password: this.state.password
        }

        let { username, password } = userData;

        console.log(`About to login user with username:${username} password:${password}`)

        this.props.loginUser(userData, this.props.history);
    }
    

    render() {
        let { username, password } = this.state;
        let { errors } = this.props;
        return (
            <div className='base-container'>
                <div className='container'>

                    <div className="header">Login</div>

                    <div className='content'>
                        <div className="image">
                            <img src={loginImg} />
                        </div>

                        <div className='form'>
                            <form onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <label htmlFor="username">Username:</label>
                                    <input type='text'
                                        placeholder='Username'
                                        id='username'
                                        className='text-input'
                                        onChange={this.onChange}
                                        value={username}
                                        error={errors}
                                    />
                                    <div className='err-tooltip'>{errors.username}</div>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor="password">Password:</label>
                                    <input type='password'
                                        placeholder='Password'
                                        id='password'
                                        className='text-input'
                                        onChange={this.onChange}
                                        value={password}
                                        error={errors}
                                    />
                                    <div className='err-tooltip'>{errors.password}</div>
                                </div>

                                <input type="submit" className='btn' value='Log In' />

                                <div className='text-center'>
                                    Don't have an account yet? 
                                    <Link className='redirect' to='/register'>
                                        Register here
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = storeState => ({
    auth: storeState.auth,
    errors: storeState.errors
}); // implied return because obj wrapped in parenthesis

const mapDispatchToProps = { loginUser, clearAuthErrors }; 

export default connect(mapStateToProps, mapDispatchToProps)(Login);