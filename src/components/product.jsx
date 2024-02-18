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
        if(cartItems) {
            this.props.data.sno in cartItems ?
                this.setState({isInCart:true}) :
                this.setState({isInCart:false});
        }
    }
    addToCart = () => {
        this.setState({isInCart : true});
        var item = {"props":this.props};
        item.props.data.qty = 1;
        var cartItems = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : {}
        cartItems[this.props.data.sno] = item
        console.log(cartItems)
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
    }
    minus = () => {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        var key = this.props.data.sno
        if(cartItems[key]["props"]["data"]["qty"] !== 0.5) { 
            cartItems[key]["props"]["data"]["qty"] = parseFloat(cartItems[key]["props"]["data"]["qty"]) - 0.5 
        } else { 
            delete cartItems[key]
            this.setState({isInCart : false})
        }
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
    }
    plus = () => {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"))
        var key = this.props.data.sno
        cartItems[key]["props"]["data"]["qty"] = parseFloat(cartItems[key]["props"]["data"]["qty"]) + 0.5
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
    }
    render() {
        var cartItems = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : {}
        return (
            <div key={"product"+this.props.data.sno} className="product">
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
                        <div className='atcBtn'><span onClick={this.minus}>-</span><span className='qty'>{"Qty: "+cartItems[this.props.data.sno]["props"]["data"]["qty"]+"kg"}</span><span onClick={this.plus}>+</span></div>
                        :
                        <button className='atcBtn' onClick={this.addToCart}>Add To Cart</button>
                    }
                    <button className='bnBtn'>Buy Now</button>
                </div>
            </div>
        );
    }
}