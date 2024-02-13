import "./loginForm.css";
import { Component } from "react";
import axios from "axios";

export default class LoginForm extends Component{
    constructor(props) {
        super(props);
        this.state = {users:null,resp:""}
    }
    componentDidMount() {
        this.getUsers()
    }
    async getUsers() {
        const { data } = await axios.get('http://localhost:4000/users');
        this.setState({users:data});
    }
    submit = (e) => {
        e.preventDefault();
        var username = e.target.parentNode.children[2].children[1].value.toString()
        var password = e.target.parentNode.children[3].children[1].value.toString()
        this.authenticate({"username":username,"password":password})
    }
    authenticate(cred) {
        this.state.users.forEach(record => {
            if(cred.username.match(/^(?=.{6,20}$)(?![_./])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/)) {
                if((record.username || record.email) === cred.username) {
                    if(record.password === cred.password) {
                        this.setState({resp:'Login successfull'})
                        document.getElementsByClassName("error")[0].style.color = "greenyellow"
                        this.login()
                        return
                    }
                } else {
                    this.setState({resp:'Invalid Credentials'})
                }
            } else {
                this.setState({resp:'Invalid Username/email'})
                return
            }
        });
    }
    login = () => {
        this.props.handleAppChange('products',true)
    }
    gotoSignUpForm = () => {
        this.props.handleAppChange("signup",false)
    }
    render() {
        return (
            <div className="loginFormContainer">
                <form>
                    <h3>Login :</h3>
                    <p className='error'>{this.state.resp}</p>
                    <div className='input'><label>UserName / Email :</label><input name="userName" type='text'/></div>
                    <div className='input'><label>Password :</label><input name="password" type='password'/></div>
                    <div className='submitbtn' onClick={e => this.submit(e)}>Submit</div>
                </form>
                <p>New Here? Please <span className='signupbtn' onClick={this.gotoSignUpForm}>SignUp</span></p>
            </div>
        )    
    }
}