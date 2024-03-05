import "./css/productsPage.css";
import Product from "./productComp";
import { Component } from "react";

export default class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { products: this.props.products };
  }
  render() {
    const page = this.state.products ? (
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
              />
            );
          })}
        </div>
        <div className="header">
          <p>Products :</p>
        </div>
      </div>
    ) : (
      loading
    );
    return page;
  }
}
