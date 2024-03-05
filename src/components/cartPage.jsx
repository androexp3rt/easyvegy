import "./css/cartPage.css";
import CartItem from "./cartItem.jsx";
import Product from "./productComp.jsx";
import { Component } from "react";

export default class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "cart",
      subTotal: 0,
      cartItems: null,
    };
  }
  componentDidMount() {
    this.getCartItems();
    this.calculateSubTotal();
    this.setHeight();
  }
  getCartItems = () => {
    var keys = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    var data = {};
    this.props.products.forEach((product) => {
      if (keys.includes(product.sno)) {
        product.qty = 1;
        data[product.sno] = product;
      }
    });
    this.setState({ cartItems: data });
  };
  removeCartItem = (key) => {
    var keys = JSON.parse(localStorage.getItem("cartItems"));
    delete this.state.cartItems[key];
    keys.splice(keys.indexOf(key), 1);
    if (Object.keys(this.state.cartItems).length === 0) {
      this.setState({ cartItems: null });
      localStorage.removeItem("cartItems");
      this.props.handleAppChange("products");
    } else {
      localStorage.setItem("cartItems", JSON.stringify(keys));
      this.calculateSubTotal();
    }
  };
  updateCartValue = (key, value) => {
    if (value === 0) {
      this.removeCartItem(key);
    } else {
      this.state.cartItems[key].qty = value;
      this.calculateSubTotal();
    }
  };
  calculateSubTotal = () => {
    console.log(this.state.cartItems);
    var subT = 0;
    this.state.cartItems
      ? Object.keys(this.state.cartItems).map((key) => {
          var item = this.state.cartItems[key];
          subT += item.price * item.qty;
        })
      : null;
    this.setState({ subTotal: subT });
  };
  checkout = () => {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var order = {};
    order.id = Date.now();
    order.items = Object.keys(cartItems).map((key) => {
      var item = cartItems[key];
      return item.props.data;
    });
    order.subTotal = parseFloat(this.state.subTotal).toFixed(2);
    order.tax = {};
    order.tax.cgst = parseFloat((this.state.subTotal * 9) / 100).toFixed(2);
    order.tax.sgst = parseFloat((this.state.subTotal * 9) / 100).toFixed(2);
    order.total = (
      parseFloat(this.state.subTotal) +
      parseFloat(order.tax.cgst) +
      parseFloat(order.tax.sgst)
    ).toFixed(2);
    this.props.handleAppChange("checkout", undefined, order);
  };
  setHeight = () => {
    if (window.innerWidth > 425) {
      var h = getComputedStyle(
        document.getElementsByClassName("billContainer")[0]
      ).height;
      document.getElementsByClassName(
        "checkOutBtnContainer"
      )[0].style.height = `calc(${h}px - 2vw)`;
    }
  };
  render() {
    return (
      <div className="cartComponent">
        <div className="cartDetailsAddressContainer">
          <div className="cartDetailsContainer">
            <h2>Items in Your Cart :</h2>
            <div className="cartItemsContainer">
              {this.state.cartItems
                ? Object.keys(this.state.cartItems).map((key) => {
                    var item = this.state.cartItems[key];
                    return (
                      <CartItem
                        key={item.sno}
                        updateCartValue={this.updateCartValue}
                        handleAppChange={this.props.handleAppChange}
                        data={item}
                      />
                    );
                  })
                : null}
            </div>
            <div className="subTotalContainer">
              <div className="billContainer">
                <div>
                  <p>Cart subtotal :</p>
                  <span>
                    &#8377;&nbsp;{parseFloat(this.state.subTotal).toFixed(2)}
                  </span>
                </div>
                <div>
                  <p>CGST :</p>
                  <span>
                    &#8377;&nbsp;
                    {parseFloat((this.state.subTotal * 9) / 100).toFixed(2)}
                  </span>
                </div>
                <div>
                  <p>SGST :</p>
                  <span>
                    &#8377;&nbsp;
                    {parseFloat((this.state.subTotal * 9) / 100).toFixed(2)}
                  </span>
                </div>
                <div>
                  <p>To Pay :</p>
                  <span>
                    &#8377;&nbsp;
                    {parseFloat(
                      this.state.subTotal + (this.state.subTotal * 18) / 100
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="checkOutBtnContainer">
                <button className="checkOutBtn" onClick={this.checkout}>
                  CheckOut
                </button>
              </div>
            </div>
          </div>
          <div className="AddressRecommendationContainer">
            <div className="savedAddressesContainer">
              <h2>Saved Addresses :</h2>
              <ul className="listOfAddresses">
                <li className="address">
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Officia minus, provident ducimus, et alias nisi excepturi
                      laborum eius dolorem voluptates mollitia nemo voluptatum
                      facere culpa dolores corporis. Fugiat, id cupiditate!
                    </p>
                    <button className="removeAddressBtn">Delete</button>
                  </div>
                </li>
                <li className="address">
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Officia minus, provident ducimus, et alias nisi excepturi
                      laborum eius dolorem voluptates mollitia nemo voluptatum
                      facere culpa dolores corporis. Fugiat, id cupiditate!
                    </p>
                    <button className="removeAddressBtn">Delete</button>
                  </div>
                </li>
              </ul>
              <button className="addAddressBtn">
                <span>+&nbsp;</span>
                <span>New Address</span>
              </button>
            </div>
            <div className="recommendationContainer">
              <h2>See Also :</h2>
              <div className="scrollbar-x seeAlsoProducts">
                {this.props.products
                  ? this.props.products.map((product) => {
                      return (
                        <Product
                          key={product.sno}
                          data={product}
                          handleAppChange={this.props.handleAppChange}
                          updateCartValue={this.updateCartValue}
                          style={{
                            marginRight: "1vw",
                            whiteSpace: "normal",
                            display: "inline-block",
                          }}
                        />
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
