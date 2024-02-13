import './product.css';
import {Component} from 'react';
import logo from '../images/logo.svg';

export default class Product extends Component{
    constructor(props) {
        super(props);
        this.state = {isInCart:false};
    };
    componentDidMount() {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        if(cartItems){
            if(this.props.data.key in cartItems) { 
                this.setState({isInCart:true})
            }
        }
        else {
            this.setState({isInCart:false});
        }
    }
    removeFromCart = () => {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        delete cartItems[this.props.data.key]
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
        this.setState({isInCart : false})
    }
    saveToCart = () => {
        this.setState({isInCart : true});
        var item = {};
        item.props = this.props
        item.props.data.qty = 1;
        var cartItems = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : {}
        cartItems[this.props.data.key] = item
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
    }
    minus = () => {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        if(cartItems[this.props.data.key]["props"]["data"]["qty"] !== 0.5) { 
            cartItems[this.props.data.key]["props"]["data"]["qty"] = parseFloat(cartItems[this.props.data.key]["props"]["data"]["qty"]) - 0.5 
            this.setState({isInCart:true})
            localStorage.setItem("cartItems",JSON.stringify(cartItems))
        } else { 
            this.removeFromCart();
        }
    }
    plus = () => {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        cartItems[this.props.data.key]["props"]["data"]["qty"] = parseFloat(cartItems[this.props.data.key]["props"]["data"]["qty"]) + 0.5
        this.setState({isInCart:true});
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
    }
    render() {
        var cartItems = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : {}
        return (
            <div key={"product"+this.props.data.key} className="product">
                <img className="productImage" src={logo} alt={this.props.data.name} />
                <p className="productName">{this.props.data.name}</p>
                <div className='productDescContainer'>
                    <p className="productDesc">{this.props.data.desc}</p>
                </div>
                <span className='productPriceWrap'>&#8377;<span id='productPrice' className="productPrice">{this.props.data.price.toFixed(2)}</span>/kg</span>
                {this.props.data.instock?<span className='productAvailability'>In Stock</span>:<span className="productAvailability" style={{color:'red'}}>Out of Stock</span>}
                <div className='productBtnsContainer'>
                    {
                        this.state.isInCart?
                        <div className='atcBtn'><span onClick={this.minus}>-</span><span className='qty'>{"Qty: "+cartItems[this.props.data.key]["props"]["data"]["qty"]+"kg"}</span><span onClick={this.plus}>+</span></div>
                        :
                        <button className='atcBtn' onClick={this.saveToCart}>Add To Cart</button>
                    }
                    <button className='bnBtn'>Buy Now</button>
                </div>
            </div>
        );
    }
}