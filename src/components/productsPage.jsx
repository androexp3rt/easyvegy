import './productsPage.css';
import Product from './product';
import {Component} from 'react';
import axios from 'axios';


export default class ProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {products: null};
    }
    async getProducts() {
        const { data } = await axios.get('http://192.168.1.2:4000/products');
        this.setState({products : data});
    }
    componentDidMount() {
        this.getProducts();
    }
    render() {
        if (!this.state.products) return (<div className="productsComponent"><h1>Products :</h1><p>No Products here</p></div>)
        return (
            <div className="productsComponent">
                <div className='header'><p>Products :</p></div>
                <div className="pgrid">
                    {this.state.products.map((p) => {
                        return <Product key={p.sno} data={p}/>
                        })
                    }
                </div>
                <div className='header'><p>Products :</p></div>
            </div>
        );
    }
}