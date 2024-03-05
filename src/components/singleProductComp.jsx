import "./css/singleProductComp.css";
import { Component } from "react";

export default class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { isInCart: false, qty: 1 };
  }
  componentDidMount() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      this.props.data.sno in cartItems
        ? this.setState({
            isInCart: true,
            qty: cartItems[this.props.data.sno]["props"]["data"]["qty"],
          })
        : this.setState({ isInCart: false, qty: 1 });
    }
  }
  addToCart = () => {
    this.setState({ isInCart: true });
    var item = { props: this.props };
    item.props.data.qty = 1;
    var cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : {};
    cartItems[this.props.data.sno] = item;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  minus = () => {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var key = this.props.data.sno;
    var input = document.getElementById(`${this.props.data.name}QtyInput`);
    if (cartItems[key]["props"]["data"]["qty"] !== 0.5) {
      cartItems[key]["props"]["data"]["qty"] =
        parseFloat(cartItems[key]["props"]["data"]["qty"]) - 0.5;
      this.setState({ qty: cartItems[key]["props"]["data"]["qty"] });
      input.value = cartItems[key]["props"]["data"]["qty"].toFixed(2);
    } else {
      delete cartItems[key];
      this.setState({ isInCart: false, qty: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  plus = () => {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var key = this.props.data.sno;
    var input = document.getElementById(`${this.props.data.name}QtyInput`);
    cartItems[key]["props"]["data"]["qty"] =
      parseFloat(cartItems[key]["props"]["data"]["qty"]) + 0.5;
    this.setState({ qty: cartItems[key]["props"]["data"]["qty"] });
    input.value = cartItems[key]["props"]["data"]["qty"].toFixed(2);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  updateQtyFromInput = (e) => {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var key = this.props.data.sno;
    var input = e.target;
    cartItems[key]["props"]["data"]["qty"] = parseFloat(input.value);
    this.setState({ qty: parseFloat(input.value) });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  inputFocus = () => {
    var input = document.getElementById(`${this.props.data.name}QtyInput`);
    input.focus();
    input.style.background = "#ffffff";
    function onEnter(ev) {
      if (ev.key === "Enter") {
        input.value = parseFloat(input.value).toFixed(2);
        input.blur();
        input.removeEventListener("keydown", onEnter);
      }
    }
    input.addEventListener("keydown", onEnter);
  };
  inputBlur = (e) => {
    e.target.value = parseFloat(e.target.value).toFixed(2);
    e.target.blur();
    e.target.style.background = "unset";
  };
  render() {
    return (
      <div
        key={`singleProduct${this.props.data.sno}`}
        className="singleProduct">
        <span
          className="spAvailability"
          style={this.props.data.inStock ? {} : { color: "red" }}>
          {this.props.data.inStock ? "In Stock" : "Out of Stock"}
        </span>
        <div className="spImageContainer">
          <img
            className="spImage"
            src={this.props.data.imgUrl}
            alt={this.props.data.name}
          />
        </div>
        <div className="spDataContainer">
          <p className="spName">{this.props.data.name}</p>
          <div className="spDescContainer">
            <span className="spDescHeader">About :&nbsp;</span>
            <div className="spDesc">
              <div>
                <span></span>
                <span>Description : {this.props.data.description}</span>
              </div>
              <div>
                <span></span>
                <span>Country of Origin : India</span>
              </div>
              <div>
                <span></span>
                <span>Shelf Life : 7 days</span>
              </div>
            </div>
            <p className="spWarning">
              Availability :&nbsp;
              {this.props.data.inventoryInKg <= 5 ? (
                <span>Last {this.props.data.inventoryInKg} kg left.</span>
              ) : this.props.data.inStock ? (
                <span style={{ color: "rgb(54, 88, 2)" }}>Available.</span>
              ) : (
                <span>Will be Available Soon.</span>
              )}
            </p>
            <p className="spPriceWrap">
              Price : &nbsp;
              <span id="price" className="spPrice">
                &#8377;&nbsp;
                {this.props.data.price.toFixed(2)}
                /kg
              </span>
            </p>
          </div>
          <div className="spBtnContainer">
            {this.state.isInCart ? (
              <button
                id={`${this.props.data.name}AddToCartBtn`}
                className="spBtn addToCartBtn">
                <span onClick={this.minus}>-</span>
                <p className="qty" onClick={this.inputFocus}>
                  <span>Qty :</span>
                  <span>
                    <input
                      id={this.props.data.name + "QtyInput"}
                      type="text"
                      defaultValue={parseFloat(this.state.qty).toFixed(2)}
                      onFocus={this.inputFocus}
                      onBlur={(e) => this.inputBlur(e)}
                      onChange={(e) => this.updateQtyFromInput(e)}
                    />
                    <span>kg</span>
                  </span>
                </p>
                <span onClick={this.plus}>+</span>
              </button>
            ) : (
              <button
                id={`${this.props.data.name}AddToCartBtn`}
                className="spBtn addToCartBtn"
                onClick={this.addToCart}>
                <div>Add To Cart</div>
              </button>
            )}
            <button
              id={`${this.props.data.name}BuyNowBtn`}
              className="spBtn buyNowBtn">
              <div>Buy Now</div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
