import "./css/productComp.css";
import { Component } from "react";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { isInCart: false, qty: 1 };
  }
  componentDidMount() {
    var keys = JSON.parse(localStorage.getItem("cartItems"));
    if (keys) {
      this.props.data.sno in keys
        ? this.setState({ isInCart: true })
        : this.setState({ isInCart: false });
    }
  }
  goToProductSpecificPage = (e) => {
    const atc = document.getElementById(`${this.props.data.name}AddToCartBtn`);
    const bn = document.getElementById(`${this.props.data.name}BuyNowBtn`);
    if (!atc.contains(e.target) && !bn.contains(e.target)) {
      this.props.updateSingleProduct
        ? this.props.updateSingleProduct(this.props.data.sno)
        : "";
      this.props.handleAppChange
        ? this.props.handleAppChange(
            "singleProduct",
            null,
            null,
            this.props.data.sno
          )
        : "";
    }
  };
  addToCart = () => {
    this.setState({ isInCart: true });
    var cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    cartItems.push(this.props.data.sno);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  minus = () => {
    console.log(`${this.props.data.name}minus`);
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var key = this.props.data.sno;
    var input = document.getElementById(`${this.props.data.name}QtyInput`);
    if (cartItems[key]["props"]["data"]["qty"] >= 1) {
      this.props.updateCartValue
        ? this.props.updateCartValue("minus", key)
        : (cartItems[key]["props"]["data"]["qty"] =
            parseFloat(cartItems[key]["props"]["data"]["qty"]) - 0.5);
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
    this.props.updateCartValue
      ? this.props.updateCartValue("plus", key)
      : (cartItems[key]["props"]["data"]["qty"] =
          parseFloat(cartItems[key]["props"]["data"]["qty"]) + 0.5);
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
        onClick={(e) => this.goToProductSpecificPage(e)}
        key={`product${this.props.data.sno}`}
        className="product"
        style={this.props.style ? this.props.style : null}>
        <span
          className="availability"
          style={this.props.data.inStock ? {} : { color: "red" }}>
          {this.props.data.inStock ? "In Stock" : "Out of Stock"}
        </span>
        <div className="imageContainer">
          <img
            className="image"
            src={this.props.data.imgUrl}
            alt={this.props.data.name}
          />
        </div>
        <p className="name">{this.props.data.name}</p>
        <div className="descContainer">
          <p className="desc">{this.props.data.description}</p>
          <p className="warning">
            {this.props.data.inventoryInKg <= 5
              ? `Last ${this.props.data.inventoryInKg} kg left.`
              : this.props.data.inStock
              ? ""
              : "Will be available soon."}
          </p>
        </div>
        <span className="priceWrap">
          &#8377;
          <span id="price" className="price">
            {this.props.data.price.toFixed(2)}
          </span>
          /kg
        </span>
        <div className="btnContainer">
          {this.state.isInCart ? (
            <button
              id={`${this.props.data.name}AddToCartBtn`}
              className="btn addToCartBtn">
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
              className="btn addToCartBtn"
              onClick={this.addToCart}>
              <div>Add To Cart</div>
            </button>
          )}
          <button
            id={`${this.props.data.name}BuyNowBtn`}
            className="btn buyNowBtn">
            <div>Buy Now</div>
          </button>
        </div>
      </div>
    );
  }
}
