import './navbar.css';
import {Component} from 'react';
import logo from '../images/logo.svg';
import searchIcon from '../images/search.png';
import cartIcon from '../images/cartIcon.png';


export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            isLoggedIn: this.props.isLoggedIn
        }
    }
    componentDidMount() {
        if("name" in localStorage){
            this.setState({name: JSON.parse(localStorage.getItem('name'))})
        }
        if("isLoggedIn" in localStorage){
            this.setState({isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn'))})
        }
    }
    goTologinPage = () => {
        this.setState({name:'login',isLoggedIn:false})
        this.props.handleAppChange('login',false)
    }
    goToregisterPage = () => {
        this.setState({name:'signup'})
        this.props.handleAppChange('signup')
    }
    goToCart = () => {
        if(!localStorage.getItem("cartItems") || localStorage.getItem("cartItems") === "{}"){
            window.alert("Cart is Empty")
        } else {
            this.setState({name:'cart'})
            this.props.handleAppChange('cart')
        }
    }
    goToProducts = () => {
        this.setState({name:'products'});
        this.props.handleAppChange('products')
    }
    hamimgClick() {
        var ham = document.getElementsByClassName("Ham")[0];
        if(ham.style.display === 'flex') {
            ham.style.display ='none';
        }
        else {
            ham.style.display ='flex';
            document.addEventListener('click',(event) => {
                var ham = document.getElementsByClassName("Ham")[0];
                var img = document.getElementsByClassName('Hamimg')[0];
                if(!ham.contains(event.target) && event.target !== img) {
                    ham.style.display = 'none';
                }
            });
        }
    }
    searchFocus() {
        document.getElementsByClassName('searchBar')[0].placeholder = "";
        document.getElementsByClassName('searchBar')[0].style.paddingLeft = "20px";
        document.getElementsByClassName('searchBar')[0].style.width = "calc(100% - 20px)";
        document.getElementsByClassName('searchBtnContainer')[0].style.cursor = "pointer"; 
        document.getElementsByClassName('searchBtnContainer')[0].style.left = "unset";
        document.getElementsByClassName('searchBtnContainer')[0].style.right = "0";
        document.getElementsByClassName('searchBtnContainer')[0].style.width = "calc(12% - 20px)";
        document.getElementsByClassName('searchBtnContainer')[0].style.backgroundColor = "rgba(0,0,0,0.2)";
        document.getElementsByClassName('goBtn')[0].style.display = "flex";
    }
    reviveSearchBar() {
        document.getElementsByClassName('searchBar')[0].placeholder = "Search Products";
        document.getElementsByClassName('searchBar')[0].style.paddingLeft = "35px";
        document.getElementsByClassName('searchBar')[0].style.width = "calc(100% - 35px)";
        document.getElementsByClassName('searchBtnContainer')[0].style.cursor = "unset";
        document.getElementsByClassName('searchBtnContainer')[0].style.left = "0";
        document.getElementsByClassName('searchBtnContainer')[0].style.right = "unset";
        document.getElementsByClassName('searchBtnContainer')[0].style.width = "calc(6% - 20px)";
        document.getElementsByClassName('searchBtnContainer')[0].style.backgroundColor = "unset";
        document.getElementsByClassName('goBtn')[0].style.display = "none";
    }
    render() {
        const userLocation = null;
        const gtCartBtn = <div className='gtcBtn' onClick={this.goToCart}><img src={cartIcon} className='gtcBtnIcon'/>My Cart</div>;
        const gtProductsBtn = <div className='gtcBtn' onClick={this.goToProducts}><img src={logo} className='gtcBtnIcon'/>Go to Products</div>;
        return (
            <header className='Navbar'>
                <div className='NavLogoContainer'>
                    <img src={logo} alt="logo"/>
                </div>
                <div className='NavMenuContainer'>
                    <div className='searchLocationContainer'>
                        <input type="text" className='searchBar' placeholder='Search Products' onFocus={this.searchFocus} onBlur={this.reviveSearchBar}/>
                        <div className='searchBtnContainer'>
                            <span className='goBtn'>Go</span>
                            <img src={searchIcon} alt='sI' className="searchIcon" />
                        </div>
                        <span className='userLocationDisplay'>{userLocation ? userLocation : "Select your Address"}<span className='dropdownArrow'></span></span>
                    </div>
                    {this.props.name === 'products' ? gtCartBtn : gtProductsBtn}
                </div>
                {this.props.isLoggedIn
                    ?   <div className='NavBtnContainer'>
                            <div className="LogOutBtn pBtn" onClick={this.goTologinPage}>Logout</div>
                        </div>
                    :   <div className='NavBtnContainer'><div className="LoginBtn pBtn" onClick={this.goTologinPage}>Login</div>
                            <div className="RegisterBtn pBtn"onClick={this.goToregisterPage}>Register</div>
                        </div>
                }
            </header>
        )
    }
}