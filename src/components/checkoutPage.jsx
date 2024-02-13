import './checkoutPage.css';
import { Component } from 'react';
import logo from '../images/logo.svg';

export default class CheckOutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {order:JSON.parse(localStorage.getItem("order"))}
    }
    pay = () => {
        console.log("pay button clicked")
    }

    render() {
        return (
            <div className='checkoutComponent'>
                <div className='orderDetails'>
                    <h3 className='header'>Order Details : </h3>
                    <div>
                        <h5>Items :</h5>
                        {Object.keys(this.state.order.items).map(
                            (key)=>{
                                return (
                                    <div key={key} className='item'>
                                        <h6>{this.state.order.items[key].name}</h6>
                                        <h6>{this.state.order.items[key].qty + " Kg"}</h6>
                                        <h6>&#8377;&nbsp;{parseFloat(parseFloat(this.state.order.items[key].price)*parseFloat(this.state.order.items[key].qty)).toFixed(2)}</h6>
                                    </div>
                                )
                            }
                        )}
                        <div className='orderPrice'>
                            <h5>Order Tax : </h5>
                            <h5>&#8377;&nbsp;{parseFloat(parseFloat(this.state.order.tax.cgst)+parseFloat(this.state.order.tax.sgst)).toFixed(2)}</h5>
                        </div>
                        <div className='orderPrice'>
                            <h5>Order Total : </h5>
                            <h5>&#8377;&nbsp;{this.state.order.total}</h5>
                        </div>
                    </div>
                    <button onClick={this.pay}>Proceed To Pay</button>
                </div>
            </div>
        )
    }
}
