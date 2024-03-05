import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/navbar";
import ProductsPage from "./components/productsPage";
import ProductSpecificPage from "./components/productSpecificPage";
import CartPage from "./components/cartPage";
import CheckOutPage from "./components/checkoutPage";
import LoginPage from "./components/loginPage";
import SignUpPage from "./components/signupPage";
import ForgotPassword from "./components/forgotPasswordPage";
import Footer from "./components/footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "products",
      products: null,
      isLoggedIn: false,
      singleProduct: null,
    };
    this.containerRef = React.createRef(
      document.getElementsByClassName("App")[0]
    );
  }
  componentDidMount() {
    this.getProducts();
    if ("name" in localStorage) {
      this.setState({ name: JSON.parse(localStorage.getItem("name")) });
    }
    if ("isLoggedIn" in localStorage) {
      this.setState({
        isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
      });
    }
    if ("order" in localStorage) {
      this.setState({ order: JSON.parse(localStorage.getItem("order")) });
    }
    if ("singleProduct" in localStorage) {
      this.setState({
        order: JSON.parse(localStorage.getItem("singleProduct")),
      });
    }
  }
  getProducts = async () => {
    axios.get("http://0.0.0.0:4000/products").then((response) => {
      const data = response.data;
      data.forEach((product) => {
        if (product.name === "Potato") {
          product.imgUrl = "http://localhost:3000/src/images/potato.jpg";
        } else if (product.name === "Onion") {
          product.imgUrl = "http://localhost:3000/src/images/onion.jpg";
        } else {
          product.imgUrl = "http://localhost:3000/src/images/logo.svg";
        }
      });
      this.setState({ products: data });
    });
  };
  handleAppChange = (
    name = null,
    isLoggedIn = null,
    order = null,
    singleProduct = null
  ) => {
    this.setState({ name: name });
    localStorage.setItem("name", JSON.stringify(name));
    if (isLoggedIn !== null) {
      this.setState({ isLoggedIn: isLoggedIn });
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }
    if (order) {
      this.setState({ order: order });
      localStorage.setItem("order", JSON.stringify(order));
    }
    if (singleProduct) {
      this.setState({ singleProduct: singleProduct });
      localStorage.setItem("singleProduct", JSON.stringify(singleProduct));
    }
  };
  display = (name) => {
    var names = {};
    names.products = (
      <ProductsPage
        products={this.state.products}
        handleAppChange={this.handleAppChange}
      />
    );
    names.singleProduct = (
      <ProductSpecificPage
        products={this.state.products}
        handleAppChange={this.handleAppChange}
        product={this.state.singleProduct}
      />
    );
    names.cart = (
      <CartPage
        products={this.state.products}
        handleAppChange={this.handleAppChange}
      />
    );
    names.checkout = (
      <CheckOutPage
        products={this.state.products}
        order={this.state.order ? this.state.order : {}}
      />
    );
    names.login = <LoginPage handleAppChange={this.handleAppChange} />;
    names.signup = <SignUpPage handleAppChange={this.handleAppChange} />;
    names.forgotPassword = (
      <ForgotPassword handleAppChange={this.handleAppChange} />
    );
    names.loading = (
      <div className="productsComponent" style={{ alignItems: "center" }}>
        <div className="circularProgressIndicator">
          <div className="circularProgressIndicatorChild"></div>
        </div>
        <br />
        <p style={{ color: "greenyellow" }}>Loading...</p>
      </div>
    );
    return names[name];
  };
  render() {
    return (
      <div ref={this.containerRef} className="scrollbar-y App">
        <Navbar
          handleAppChange={this.handleAppChange}
          name={this.state.name ? this.state.name : "products"}
          isLoggedIn={this.state.isLoggedIn}
        />
        <div className="App-body">
          {this.state.products
            ? this.display(this.state.name)
            : this.display("loading")}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
