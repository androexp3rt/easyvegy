import "./loginPage.css";
import { Component } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";

export default class LoginPage extends Component{
    constructor(props) {
        super(props);
        this.state = {resp:''}
    }
    componentDidMount() {
        this.setState({resp:''})
    }
    submit = (e) => {
        e.preventDefault();
        var username = e.target.parentNode.children[2].children[1].value
        var password = CryptoJS.AES.encrypt(e.target.parentNode.children[3].children[1].value,process.env.REACT_APP_KEY).toString()
        this.authenticate({"email":username,"password":password})
    }
    async authenticate(cred) {
        if (!cred.email.match(/^(?=.{6,50}$)(?![_./@!#$%^&*()-+={}[,<>`~?''""|])(?!.*[/!#$%^&*()-+={}[,<>`~?''""|]{1})[a-z A-Z._@]+(?<![_./@!#$%^&*()-+={}[,<>`~?''""|])$/)) {
            this.setState({resp:'invalid Username/Email'})
        } else {
            await axios.post('http://192.168.1.2:4000/login', cred)
                .then( (resp) => {
                    if(resp.data.msg === "Login Successful") {
                        this.props.handleAppChange('products',true)
                    } else {
                        this.setState({resp:resp.data.msg})
                    }
                }
            )
        }
    }
    gotoSignUpForm = () => {
        this.props.handleAppChange("signup",false)
    }
    gotoForgotPassword = () => {
        this.props.handleAppChange("forgotPassword",false)
    }
    render() {
        return (
            <div className="loginFormContainer">
                <form>
                    <h3>Login :</h3>
                    <p className='error'>{this.state.resp}</p>
                    <div className='input'><label>UserName / Email :</label><input name="userName" type='text'/></div>
                    <div className='input'><label>Password :</label><input name="password" type='password'/></div>
                    <button className='submitbtn pBtn' onClick={e => this.submit(e)}>Submit</button>
                </form>
                <p>New Here? Please &nbsp; <button className='signupbtn pBtn' onClick={this.gotoSignUpForm}>SignUp</button></p>
                <button className="forgotPasswordBtn" onClick={this.gotoForgotPassword}><u>Forgot Password?</u></button>
            </div>
        )    
    }
}