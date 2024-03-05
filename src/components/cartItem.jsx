import "./css/cartItem.css";
import { Component } from "react";

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isInCart: true };
  }
  removeFromCart = () => {
    this.setState({ isInCart: false });
    this.props.updateCartValue(this.props.data.sno, 0);
  };
  plusMinus = (operation) => {
    var input = document.getElementById(`cart${this.props.data.name}QtyInput`);
    operation === "fromInput"
      ? (this.props.data.qty = parseFloat(input.value))
      : operation === "plus"
      ? (this.props.data.qty = parseFloat(input.value) + 0.5)
      : (this.props.data.qty = parseFloat(input.value) - 0.5);
    input.value = this.props.data.qty.toFixed(2);
    this.props.updateCartValue(this.props.data.sno, this.props.data.qty);
  };
  inputFocus = () => {
    const input = document.getElementById(
      `cart${this.props.data.name}QtyInput`
    );
    input.focus();
    input.style.background = "#ffffff";
    input.addEventListener("keydown", this.onEnter);
  };
  onEnter = (ev) => {
    const input = document.getElementById(
      `cart${this.props.data.name}QtyInput`
    );
    if (ev.key === "Enter") {
      input.blur();
      input.removeEventListener("keydown", this.onEnter);
      this.plusMinus("fromInput");
    }
  };
  inputBlur = () => {
    const input = document.getElementById(
      `cart${this.props.data.name}QtyInput`
    );
    input.value = parseFloat(input.value).toFixed(2);
    input.style.background = "unset";
  };
  render() {
    if (this.state.isInCart) {
      return (
        <div key={this.props.data.sno} className="cartItem">
          <button className="removeFromCartBtn" onClick={this.removeFromCart}>
            X
          </button>
          <div className="cartItemImageContainer">
            <img
              className="cartItemImage"
              src={this.props.data.imgUrl}
              alt={"product"}
            />
          </div>
          <div className="detailsContainer">
            <p className="cartItemDetail">{this.props.data.name}</p>
            <p className="cartItemDetail">
              <span>Price Per Kg : </span>
              <span>
                &#8377;&nbsp;{parseFloat(this.props.data.price).toFixed(2)}
              </span>
            </p>
            <p className="cartItemDetail">
              <span>Item Total :</span>
              <span>
                &#8377;&nbsp;
                {parseFloat(
                  this.props.data.price * this.props.data.qty
                ).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="btnContainer">
            <button className="setQtyBtn">
              <span onClick={() => this.plusMinus("minus")}>-</span>
              <form
                className="qty"
                onClick={this.inputFocus}
                onSubmit={(e) => {
                  e.preventDefault();
                  this.plusMinus("fromInput");
                  return false;
                }}>
                <label>Qty :</label>
                <span>
                  <input
                    id={`cart${this.props.data.name}QtyInput`}
                    type="text"
                    defaultValue={parseFloat(this.props.data.qty).toFixed(2)}
                    onFocus={this.inputFocus}
                    onBlur={this.inputBlur}
                  />
                  <span>kg</span>
                </span>
              </form>

              <span onClick={() => this.plusMinus("plus")}>+</span>
            </button>
          </div>
        </div>
      );
    }
  }
}
