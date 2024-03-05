import "./css/navbar.css";
import { Component } from "react";
import logo from "../images/logo.svg";
import searchIcon from "../images/search.png";
import locationIcon from "../images/location.png";
import login from "../images/login.png";
import logout from "../images/logout.png";
import signup from "../images/signup.png";
import cartIcon from "../images/cartIcon.png";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      isLoggedIn: this.props.isLoggedIn,
    };
  }
  componentDidMount() {
    if ("name" in localStorage) {
      this.setState({ name: JSON.parse(localStorage.getItem("name")) });
    }
    if ("isLoggedIn" in localStorage) {
      this.setState({
        isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
      });
    }
  }
  goToLoginPage = () => {
    this.setState({ name: "login" });
    this.props.handleAppChange("login", false);
  };
  goToSignUpPage = () => {
    this.setState({ name: "signup" });
    this.props.handleAppChange("signup", false);
  };
  goToCart = () => {
    if (
      !localStorage.getItem("cartItems") ||
      localStorage.getItem("cartItems") === "{}"
    ) {
      window.alert("Cart is Empty");
    } else {
      this.setState({ name: "cart" });
      this.props.handleAppChange("cart");
    }
  };
  goToProducts = () => {
    this.setState({ name: "products" });
    this.props.handleAppChange("products");
  };
  getElements = () => {
    const elements = {};
    elements.searchBarContainer =
      document.getElementsByClassName("searchContainer")[0];
    elements.searchBar = document.getElementsByClassName("searchBar")[0];
    elements.btn = document.getElementsByClassName("goBtn")[0];
    elements.locationContainer =
      document.getElementsByClassName("locationContainer")[0];
    elements.locationBtn =
      document.getElementsByClassName("locationIconWrap")[0];
    elements.locationSelector =
      document.getElementsByClassName("locationSelector")[0];
    return elements;
  };
  searchBarFocus = () => {
    const elements = this.getElements();
    if (elements.searchBar.value.trim() === "") {
      elements.btn.classList.add("animateLTR");
      elements.searchBar.style.paddingLeft = "1vw";
      setTimeout(function () {
        elements.btn.style.background = "rgba(0,0,0,0.2)";
        elements.btn.style.left = "unset";
        elements.btn.style.right = "0";
        elements.btn.classList.remove("animateLTR");
      }, 1000);
    }
  };
  searchBarBlur = () => {
    const elements = this.getElements();
    if (window.innerWidth <= 768) {
      elements.searchBar.blur();
      // TODO: onBlur for small screens
    } else {
      if (elements.searchBar.value.trim() === "") {
        this.reviveSearchBar();
      }
      elements.searchBar.blur();
    }
  };
  reviveSearchBar() {
    const elements = this.getElements();
    if (window.innerWidth > 768) {
      // elements.btn.classList.add("animateRTL")
      elements.searchBar.style.paddingLeft = "3vw";
      // setTimeout(function() {
      elements.btn.style.background = "unset";
      elements.btn.style.left = "0";
      elements.btn.style.right = "unset";
      // elements.btn.classList.remove("animateRTL");
      //   }, 1000);
    } else {
      // TODO: REVIVE logic for small screens
    }
  }
  locationBtnClick = () => {
    const elements = this.getElements();
    if (window.innerWidth <= 768) {
      if (getComputedStyle(elements.locationSelector).display == "none") {
        elements.locationContainer.classList.add("animateOpenLocation");
        elements.locationSelector.style.display = "flex";
        setTimeout(function () {
          elements.btn.style.backgroundColor = "#ffffff";
          elements.searchBar.style.display = "none";
          elements.locationContainer.style.width = "53vw";
          elements.searchBar.blur();
          elements.locationContainer.classList.remove("animateOpenLocation");
        }, 1000);
      } else {
        // TODO: Show dropdown for location selector
      }
    } else {
      // TODO: Show dropdown for location selector on large screens
      elements.locationSelector.style.display = "flex";
    }
  };
  searchBtnClick = (e) => {
    e.preventDefault();
    const elements = this.getElements();
    if (window.innerWidth <= 768) {
      if (getComputedStyle(elements.searchBar).display == "none") {
        elements.locationContainer.classList.add("animateCloseLocation");
        elements.searchBar.style.display = "block";
        elements.searchBar.focus();
        setTimeout(function () {
          elements.locationSelector.style.display = "none";
          elements.btn.style.backgroundColor = "rgba(0,0,0,0.2)";
          elements.locationContainer.style.width = "6vw";
          elements.locationContainer.classList.remove("animateCloseLocation");
        }, 1000);
      } else {
        if (elements.searchBar.value.trim() !== "") {
          this.search();
        }
        this.searchBarBlur();
      }
    } else {
      if (parseFloat(getComputedStyle(elements.btn).right) === 0) {
        if (elements.searchBar.value.trim() !== "") {
          this.search();
        }
        this.searchBarBlur();
      }
    }
  };
  search = () => {
    //logic to search products
  };
  render() {
    const userLocation = null;
    const gtCartBtn = (
      <button className="button gtcBtn" onClick={this.goToCart}>
        <img src={cartIcon} alt="cartIcon" />
        <span>My Cart</span>
      </button>
    );
    const gtProductsBtn = (
      <button className="button gtcBtn" onClick={this.goToProducts}>
        <img src={logo} alt="productsIcon" />
        <span>Go to Products</span>
      </button>
    );
    const signupBtn = (
      <button className="button NavBtn" onClick={this.goToSignUpPage}>
        <img src={signup} alt="signupIcon" />
        <span>SignUp</span>
      </button>
    );
    const loginBtn = (
      <button className="button NavBtn" onClick={this.goToLoginPage}>
        <img src={login} alt="loginIcon" />
        <span>Login</span>
      </button>
    );
    const logoutBtn = (
      <button className="button NavBtn" onClick={this.goToLoginPage}>
        <img src={logout} alt="logoutIcon" />
        <span>Logout</span>
      </button>
    );
    return (
      <header className="Navbar">
        <div className="NavLogoContainer">
          <img src={logo} alt="logo" />
        </div>
        <div className="NavSearchLocationContainer">
          <form
            className="searchContainer"
            onSubmit={(e) => this.searchBtnClick(e)}>
            <input
              type="text"
              className="searchBar"
              placeholder="Search Products"
              onFocus={this.searchBarFocus}
              onBlur={this.searchBarBlur}
            />
            <button
              onClick={(e) => this.searchBtnClick(e)}
              className="button goBtn">
              <img src={searchIcon} alt="sI" />
            </button>
          </form>
          <div className="locationContainer">
            <button
              onClick={this.locationBtnClick}
              className="button locationIconWrap">
              <img src={locationIcon} alt="lI" />
            </button>
            <span className="locationSelector">
              {userLocation ? userLocation : "Select your Address"}
            </span>
          </div>
        </div>
        <div className="NavBtnContainer">
          {this.props.name === "products" || this.props.name === "singleProduct"
            ? gtCartBtn
            : gtProductsBtn}
          {this.props.isLoggedIn ? logoutBtn : loginBtn}
          {!this.props.isLoggedIn ? signupBtn : <></>}
        </div>
      </header>
    );
  }
}
