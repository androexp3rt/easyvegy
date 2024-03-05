import "./css/productsPage.css";
import "./css/productSpecificPage.css";
import Product from "./productComp";
import SingleProduct from "./singleProductComp";
import { Component } from "react";

export default class ProductSpecificPage extends Component {
  constructor(props) {
    super(props);
    this.state = { singleProduct: null, products: this.props.products };
  }
  componentDidMount() {
    var sno = this.props.product
      ? this.props.product
      : localStorage.getItem("singleProduct")
      ? JSON.parse(localStorage.getItem("singleProduct"))
      : null;
    this.state.products.forEach((product) => {
      if (product.sno === sno) {
        this.setState({ singleProduct: product });
      }
    });
  }
  updateSingleProduct = (sno) => {
    this.state.products.forEach((product) => {
      if (product.sno === sno) {
        this.setState({ singleProduct: product });
      }
    });
  };
  render() {
    const loading = (
      <div
        className="productSpecificComponent"
        style={{ alignItems: "center" }}>
        <div className="circularProgressIndicator">
          <div className="circularProgressIndicatorChild"></div>
        </div>
        <br />
        <p style={{ color: "greenyellow" }}>Loading...</p>
      </div>
    );
    const singleProduct = this.state.singleProduct ? (
      <div className="singleProductContainer">
        <SingleProduct
          key={`singleProduct${this.state.singleProduct.sno}`}
          data={this.state.singleProduct}
        />
      </div>
    ) : (
      <></>
    );
    const page = this.state.products ? (
      <div className="productSpecificComponent">
        {singleProduct}
        <div className="productsComponent">
          <div className="header">
            <p>Products :</p>
          </div>
          <div className="productsGrid">
            {this.state.products.map((p) => {
              return (
                <Product
                  key={p.sno}
                  data={p}
                  handleAppChange={this.props.handleAppChange}
                  updateSingleProduct={this.updateSingleProduct}
                />
              );
            })}
          </div>
          <div className="header">
            <p>Products :</p>
          </div>
        </div>
      </div>
    ) : (
      loading
    );
    return page;
  }
}
