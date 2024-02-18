import './cartPage.css';
import { Component } from 'react';
import logo from '../images/logo.svg';

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = { isInCart: true }
    }
    removeFromCart = () => {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        delete cartItems[this.props.data.sno]
        this.setState({ isInCart: false })
        if (Object.keys(cartItems).length === 0) {
            localStorage.removeItem("cartItems")
            this.props.updateSubTotal('products')
        } else {
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            this.props.updateSubTotal('cart')
        }
    }
    minus = () => {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        var key = this.props.data.sno
        if (cartItems[key]["props"]["data"]["qty"] !== 0.5) {
            cartItems[key]["props"]["data"]["qty"] = parseFloat(cartItems[key]["props"]["data"]["qty"]) - 0.5
            this.props.data.qty = parseFloat(this.props.data.qty) - 0.5
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            this.props.updateSubTotal('cart')
        } else {
            this.removeFromCart();
        }
    }
    plus = () => {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        var key = this.props.data.sno
        cartItems[key]["props"]["data"]["qty"] = parseFloat(cartItems[key]["props"]["data"]["qty"]) + 0.5
        this.props.data.qty = parseFloat(this.props.data.qty) + 0.5
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        this.props.updateSubTotal('cart')
    }
    render() {
        if (this.state.isInCart) {
            return (
                <div key={this.props.data.sno} className='cartItem'>
                    <button className="removeFromCartbtn" onClick={this.removeFromCart}>x</button>
                    <img className='cartItemImage' src={logo} alt={"product"}/>
                    <div className="detailsContainer">
                        <p className='cartItemdetail'>{this.props.data.name}</p>
                        <p className='cartItemdetail'>{"Price Per Kg : " + this.props.data.price}</p>
                        <p className='cartItemdetail'>{"Item Total : Rs. " + this.props.data.price * this.props.data.qty}</p>
                    </div>
                    <div className="detailsContainer btnContainer">
                        <div className="plusMinusBtns">
                            <span onClick={this.minus}>-</span>
                            <span className='qty'>{this.props.data.qty + "kg"}</span>
                            <span onClick={this.plus}>+</span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'cart',
            subTotal: 0
        }
    }
    calculateSubTotal = () => {
        var cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : {}
        var subT = 0
        Object.keys(cartItems).map((key) => { subT += cartItems[key].props.data.price * cartItems[key].props.data.qty; return null})
        return subT;
    }
    updateSubTotal = (page) => {
        this.setState({ name: page, subTotal: this.calculateSubTotal() })
        this.props.handleAppChange(page)
    }
    componentDidMount() {
        this.setState({ name: 'cart', subTotal: this.calculateSubTotal() })
    }
    checkout = () => {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        var order = {}
        order.id = Date.now()
        order.items = Object.keys(cartItems).map((key) => {
            var item = cartItems[key]
            return (item.props.data)
        })
        order.subTotal = parseFloat(this.state.subTotal).toFixed(2)
        order.tax = {}
        order.tax.cgst = parseFloat(this.state.subTotal * 9 / 100).toFixed(2)
        order.tax.sgst = parseFloat(this.state.subTotal * 9 / 100).toFixed(2)
        order.total = (parseFloat(this.state.subTotal) + parseFloat(order.tax.cgst) + parseFloat(order.tax.sgst)).toFixed(2)
        this.props.handleAppChange('checkout', undefined, order)
    }

    render() {
        var cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : {}
        return (
            <div className="cartComponent">
                <div className='cartDetailsAddressContainer'>
                    <div className='cartDetailsContainer'>
                        <p>Items in Your Cart :</p>
                        <div className='cartItemsContainer'>
                            {Object.keys(cartItems).map((key) => {
                                var item = cartItems[key]
                                return <CartItem key={item.props.data.sno} updateSubTotal={this.updateSubTotal} data={item.props.data} />
                            })}
                        </div>
                        <div className='subTotalContainer'>
                            <div className='billContainer'>
                                <div><p>Cart subtotal</p><div><p> :</p><p> {parseFloat(this.state.subTotal).toFixed(2)}</p></div></div>
                                <div><p>CGST</p><div><p> :</p><p> {parseFloat(this.state.subTotal * 9 / 100).toFixed(2)}</p></div></div>
                                <div><p>SGST</p><div><p> :</p><p> {parseFloat(this.state.subTotal * 9 / 100).toFixed(2)}</p></div></div>
                                <div><p>To Pay</p><div><p> :</p><p> {parseFloat(this.state.subTotal + this.state.subTotal * 36 / 100).toFixed(2)}</p></div></div>
                            </div>
                            <div className='checkOutBtnContainer'>
                                <button className='checkOutBtn' onClick={this.checkout}>CheckOut</button>
                            </div>
                        </div>
                    </div>
                    <div className='AddressRecomendatiosContainer'>
                        <div className='savedAddressesContainer'>
                            <p>Saved Addresses :</p>
                            <ul className='listofaddresses'>
                                <li className='address'>..........<div className='removeAddressbtn'>Delete</div></li>
                                <li className='address'>..........<div className='removeAddressbtn'>Delete</div></li>
                            </ul>
                            <div className='addAddressBtn'>
                                <p className='plusIconImg'><span>+</span> New Address</p>
                            </div>
                        </div>
                        <div className='recomendationsContainer'>
                            <p>See Also :</p>
                        </div>
                    </div>
                </div>
                {/* <div className='recomendationsContainer'>
                    <p>See Also :</p>
                </div> */}
            </div>
        );
    }
}