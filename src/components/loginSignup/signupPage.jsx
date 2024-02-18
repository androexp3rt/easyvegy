import "./signupPage.css";
import { Component } from "react";
import axios from "axios";

export default class SignUpPage extends Component{
    constructor(props) {
        super(props);
        this.state = {resp:""}
    }
    componentDidMount() {
        this.setState({resp:""})
    }
    submit = (e) => {
        e.preventDefault();
        this.authenticate({
            "name":e.target.parentNode.children[2].children[1].value,
            "phone":e.target.parentNode.children[3].children[1].value,
            "username":e.target.parentNode.children[4].children[1].value,
            "email":e.target.parentNode.children[5].children[1].value,
            "password":e.target.parentNode.children[6].children[1].value
        })
        document.getElementsByClassName("error")[0].innerHTML = this.state.resp
        if(this.state.resp === 'Registeration successfull'){ document.getElementsByClassName("error")[0].style.color = "greenyellow"}
    }
    async authenticate(cred) {
        if(/[^a-zA-z]+$/.test(toString(cred.userName))){

        } else {
            await axios.post("http://192.168.1.2:40000/register",cred).then((req,res) => {
                this.setState({resp:toString(res)})
                this.register()
                return
            })
        }
    }
    register = () => {
        this.props.handleAppChange('login',false)
    }
    goToLoginPage = () => {
        this.props.handleAppChange("login",false)
    }
    render() {
        return (
            <div className="signupFormContainer">
                <form>
                    <h3>SignUp :</h3>
                    <p className='error'>{this.state.resp}</p>
                    <div className='input'><label>Name :</label><input name="name" type='text'/></div>
                    <div className='input'><label>Phone :</label><input name="phone" type='phone'/></div>
                    <div className='input'><label>UserName :</label><input name="userName" type='text'/></div>
                    <div className='input'><label>Email :</label><input name="email" type='email'/></div>
                    <div className='input'><label>Password :</label><input name="password" type='password'/></div>
                    <button className='submitbtn pBtn' onClick={e => this.submit(e)}>Submit</button>
                </form>
                <p>Allready a User? Please &nbsp;<button className='signupbtn  pBtn' onClick={this.goToLoginPage}>Login</button></p>
            </div>
        )    
    }
}