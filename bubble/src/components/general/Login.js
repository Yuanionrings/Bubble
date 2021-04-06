import React, { Component } from 'react';
import { loginUser } from '../../actions/userAuthActions';
import { connect } from 'react-redux';

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
      //      this.props.history.push('/profile'); 
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.errors !== this.props.errors) {
            let errors = this.props.errors;
            for (let key in errors) 
                if (this.state[key] && errors['resetField']) 
                    this.setState( { [key]: "" }) 
        }
    }

    // If you need to do something with the new state value right after you change it, use callback (example below)
    onChange = (event) => this.setState({[event.target.id]:event.target.value}, () => { /* Callback example */ })
    
    onSubmit = (event) => {
        // Prevent Default Page Refesh
        event.preventDefault()

        const userData = {
            username:this.state.username,
            password:this.state.password
        }

        let {username, password} = userData;

        console.log(`About to login user with username:${username} password:${password}`)
        
        this.props.loginUser(userData);
    }

    render() {
        let { username, password } = this.state;
        let { errors } = this.props;
        return(
            <div>
                <div className='container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type = 'text'
                                placeholder='Username'
                                id='username'
                                error={errors}
                                onChange={this.onChange}
                                value={username}
                                className='form-control form-group'
                            />
                            <span className='red-text'>
                                {errors.username}
                            </span>

                            <input type = 'password'
                                placeholder='Password'
                                id='password'
                                error={errors}
                                onChange={this.onChange}
                                value={password}
                                className='form-control form-group'
                            />
                            <span className='red-text'>
                                {errors.password}
                            </span>

                            <input type='submit' className='btn btn-danger btn-block' value='Log In'/>
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