import Navbar from './components/navbar';
import ProductsPage from './components/productsPage';
import CartPage from './components/cartPage';
import CheckOutPage from './components/checkoutPage'
import LoginPage from './components/loginSignup/loginSignupPage';
import Footer from './components/footer';
import './App.css';
import { Component } from 'react';

class App extends Component{    
    constructor(props){
        super(props);
        this.state = {
            name: 'products',
            isLoggedIn: false
        }
    }
    componentDidMount() {
        this.setState({name: 'products',isLoggedIn: false})
        if("name" in localStorage) {
            this.setState({name:JSON.parse(localStorage.getItem("name"))})
        }
        if("isLoggedIn" in localStorage) {
            this.setState({isLoggedIn:JSON.parse(localStorage.getItem("isLoggedIn"))})
        }
    }
    handleAppChange = (name,isLoggedIn,order) => {
        if(isLoggedIn !== undefined) {
            this.setState({name:name,isLoggedIn:isLoggedIn})
            localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
        }
        this.setState({name:name})
        localStorage.setItem('name', JSON.stringify(name))
        if(order) {
            this.setState({order:order})
            localStorage.setItem('order', JSON.stringify(order))
        }
    }
    render() {
        return (
            <div className="App">
                <Navbar handleAppChange={this.handleAppChange} name={this.state.name} isLoggedIn={this.state.isLoggedIn}/>
                <div className="App-body">
                    {this.state.name === 'products' ? <ProductsPage handleAppChange={this.handleAppChange}/> : this.state.name === 'cart' ? <CartPage handleAppChange={this.handleAppChange}/> : this.state.name === 'checkout'? <CheckOutPage order={this.state.order?this.state.order:{}} />:<LoginPage handleAppChange={this.handleAppChange} name={this.state.name} /> }
                </div>
                <Footer />
            </div>
        )
    }
}

export default App;