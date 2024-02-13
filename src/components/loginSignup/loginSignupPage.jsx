import {Component} from 'react'
import LoginForm from './loginForm'
import SignUpForm from './signupForm'

export default class LoginPage extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            this.props.name==="signup"?<SignUpForm handleAppChange={this.props.handleAppChange}/>:<LoginForm handleAppChange={this.props.handleAppChange}/>
        )
    }
}