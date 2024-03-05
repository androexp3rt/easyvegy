import "./css/loginSignupPage.css";
import { Component } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import CryptoJS from "crypto-js";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { resp: "" };
  }
  componentDidMount() {
    this.setState({ resp: "" });
  }
  submit = async (e) => {
    e.preventDefault();
    // var username = e.target.parentNode.children[2].children[1].value;
    // var password = e.target.parentNode.children[3].children[1].value;
    await axios.get("http://0.0.0.0:4000/pyek").then((res) => {
      var k = res.data;
      k = k.slice(12, 28) + k.slice(40, 56);
      var username = e.target.parentNode.children[2].children[1].value;
      var password = CryptoJS.AES.encrypt(
        e.target.parentNode.children[3].children[1].value,
        k
      ).toString();
      this.authenticate({ email: username, password: password });
    });
    // const User = signInWithEmailAndPassword(auth, username, password).then(
    //   (user) => {
    //     this.props.handleAppChange("products", true);
    //   }
    // );
  };
  async authenticate(cred) {
    if (
      !cred.email.match(
        /^(?=.{6,50}$)(?![_./@!#$%^&*()-+={}[,<>`~?''""|])(?!.*[/!#$%^&*()-+={}[,<>`~?''""|]{1})[a-z A-Z._@]+(?<![_./@!#$%^&*()-+={}[,<>`~?''""|])$/
      )
    ) {
      this.setState({ resp: "invalid Username/Email" });
    } else {
      await axios.post("http://0.0.0.0:4000/login", cred).then((resp) => {
        if (resp.data.msg === "Login Successful") {
          this.props.handleAppChange("products", true);
        } else {
          this.setState({ resp: resp.data.msg });
        }
      });
    }
  }
  gotoSignUpPage = () => {
    this.props.handleAppChange("signup", false);
  };
  gotoForgotPassword = () => {
    this.props.handleAppChange("forgotPassword", false);
  };
  render() {
    return (
      <div className="loginFormContainer">
        <form>
          <h2>Login :</h2>
          <p className="error">{this.state.resp}</p>
          <div className="inputContainer">
            <label>Username / Email :</label>
            <input name="userName" type="text" />
          </div>
          <div className="inputContainer">
            <label>Password :</label>
            <input name="password" type="password" />
          </div>
          <button className="submitBtn pBtn" onClick={(e) => this.submit(e)}>
            Submit
          </button>
        </form>
        <p>
          New Here? Please &nbsp;
          <button className="signupBtn pBtn" onClick={this.gotoSignUpPage}>
            SignUp
          </button>
        </p>
        <button className="forgotPasswordBtn" onClick={this.gotoForgotPassword}>
          <u>Forgot Password?</u>
        </button>
      </div>
    );
  }
}
