import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { connect } from 'react-redux';
import clearAuthErrors from '../../util/clearAuthErrors'

import { Link, withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/userAuthActions';

import loginImg from "../../resources/soap.png";

import "./style.scss";

class Register extends Component {
    constructor() {
        super()
        this.state = {
            fullName: '',
            username: '',
            email: '',
            password: '',
        }
    }

    componentDidMount() {
        this.props.clearAuthErrors();
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }
    
    componentDidUpdate(prevProps) {
        console.log(this.props.errors)
        if (prevProps.errors !== this.props.errors) {
            let errors = this.props.errors;
            console.log('updating this component bc props errors changed')
            for (let key in errors) {
                if (key in this.state && errors['resetField']) {
                    this.setState({ [key]: "" })
                    console.log(`reset ${key} input on Registration page because props.errors changed and received an error here`)
                }
            }
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    onSubmit = (event) => {
        // Prevent Default Page Refesh
        event.preventDefault()

        const userData = {
            fullName: this.state.fullName,
            username: this.state.username,
            identifier: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        this.props.registerUser(userData, this.props.history);
    }

    render() {
        let { fullName, username, email, password } = this.state;
        let { errors } = this.props;
        return(
            <div className="base-container">

                <div className="container">

                    <div className="header">Register</div>

                    <div className='content'>
                        <div className="image">
                            <img src={loginImg} />
                        </div>

                        <div className='form'>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="full name">Display Name:</label>
                                    <input type = 'text'
                                    placeholder='Name'
                                    id='fullName'
                                    onChange={this.onChange}
                                    value={fullName}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input type = 'text'
                                    placeholder='Username'
                                    id='username'
                                    onChange={this.onChange}
                                    value={username}
                                    error={errors}
                                    />
                                    <span className='red-text'>
                                        {errors.username}
                                    </span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type = 'text'
                                    placeholder='Email'
                                    id='email'
                                    onChange={this.onChange}
                                    value={email}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type = 'password'
                                    placeholder='Password'
                                    id='password'
                                    onChange={this.onChange}
                                    value={password}
                                    />
                                </div>

                                <input type='submit' className='btn' value='Register'/>

                                <div className='text-center'>
                                    Already have an account? 
                                    <Link className='redirect' to='/login'>
                                        Login here
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

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
}); // implied return because obj wrapped in parenthesis

const mapDispatchToProps = { registerUser, clearAuthErrors }; // Calling props.loginUser(userData) will now call our function inside userAuthActions

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));