import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/userAuthActions';

import loginImg from "../../resources/soap.png";

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
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard'); 
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
        return (
            <div>
                <div className='full-screen-container'>
                    <div className='form-container'>
                        <h3>Welcome</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className='input-group'>
                                <input type='text'
                                    placeholder='Full Name'
                                    id='fullName'
                                    onChange={this.onChange}
                                    value={fullName}
                                    className='text-input' />
                                <div className='err-tooltip'>{errors.fullName}</div>
                            </div>
                            <div className='input-group'>
                                <input type='text'
                                    placeholder='Username'
                                    id='username'
                                    onChange={this.onChange}
                                    value={username}
                                    error={errors}
                                    className='text-input' />
                                <div className='err-tooltip'>{errors.username}</div>
                            </div>
                            <div className='input-group'>
                                <input type='text'
                                    placeholder='Email'
                                    id='email'
                                    onChange={this.onChange}
                                    value={email}
                                    className='text-input' />
                                <div className='err-tooltip'>{errors.email}</div>
                            </div>
                            <div className='input-group'>
                                <input type='password'
                                    placeholder='Password'
                                    id='password'
                                    onChange={this.onChange}
                                    value={password}
                                    className='text-input' />
                                <div className='err-tooltip'>{errors.password}</div>
                            </div>
                            <input type='submit' className='btn btn-red' value='Register' />
                        </form>
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

const mapDispatchToProps = { registerUser }; // Calling props.loginUser(userData) will now call our function inside userAuthActions

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));