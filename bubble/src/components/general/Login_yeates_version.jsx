import React, { Component } from 'react';
import { loginUser } from '../../actions/userAuthActions';
import { connect } from 'react-redux';
import "./StyleSheet.css";
class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
        }
    }

    componentDidMount() {
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
            <div>
                <div className='full-screen-container'>
                    <div className='form-container'>
                        <h3>Welcome</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className='input-group'>
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
                            <div className='input-group'>
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
                            <input type="submit" className='btn btn-red' value='Log In' />
                        </form>
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

const mapDispatchToProps = { loginUser }; // Calling props.loginUser(userData) will now call our function inside userAuthActions

export default connect(mapStateToProps, mapDispatchToProps)(Login);