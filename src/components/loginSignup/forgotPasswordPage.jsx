import './forgotPasswordPage.css'
import { Component } from "react";

export default class ForgotPassword extends Component{
    constructor(props) {
        super(props)
        this.state = {
            resp:'',
            socket:null
        }
    }
    createNewSocket = () => {
        var newSocket = new WebSocket("ws://192.168.1.2:4002/")
        newSocket.onopen = () => {
            console.log('WebSocket connected', newSocket.readyState);
        };
        newSocket.onmessage = async(event) => {
            this.setState({resp: event.data})
        };
        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        this.setState({socket: newSocket});
    }
    componentDidMount = () => {
        this.createNewSocket()
    }
    sendMessage = (email,phone) => {
        console.log('WebSocket State', this.state.socket.readyState);
        this.state.socket.send(JSON.stringify({"email":"sujeet@gmail.com","phone":"9999239307"}))
    }
    submit = (e) => {
        e.preventDefault()
        var email = e.target.parentNode.children[0].value
        var phone = e.target.parentNode.children[2].value
        this.sendMessage(email,phone)
    }
    render() {
        return (
            <div>
                <input type='email' id='email' placeholder='Enter your email'/>
                <span>OR</span>
                <input type='phone' id='phone' placeholder='Enter your phone'/>
                <button id="submit" onClick={(e)=>this.submit(e)}>Submit</button>
            </div>
        )
    }
}
