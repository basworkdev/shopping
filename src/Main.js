import React , {useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

// CSS
import './assets/bootstrap-4.5.3/css/bootstrap-grid.css'
import './assets/bootstrap-4.5.3/css/bootstrap-reboot.css'
import './assets/bootstrap-4.5.3/css/bootstrap.css'
import './assets/css/main.css'
import './assets/css/main-admin.css'
import './assets/fontawesome-free-5.15.1-web/css/all.css';
import './assets/css/spinner.css'

// JS
import $ from "jquery"
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Admin Page
import LoginAdminPage from './page/admin/LoginPage'
import DashboardPage from './page/admin/DashboardPage'

// Page
import HomePage from './page/HomePage'
import ProductPage from './page/ProductPage'
import CatalogPage from './page/CatalogPage'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'
import CartPage from './page/CartPage'
import ShipmentInfoPage from './page/ShipmentInfoPage'
import PaymentPage from './page/PaymentPage'
import ProductStepPage from './page/ProductStepPage'

// Components
import OpenChatComp from './componenst/OpenChatComp'
import CartButtonComp from './componenst/CartButtonComp'
import NavBarTopComp from './componenst/NavBarTopComp'
import MenuTopComp from './componenst/MenuTopComp'
import FooterComp from './componenst/FooterComp'
import TopUpComp from './componenst/TopUpComp'

// Admin Components
import AdminMenuTopComp from './componenst/admin/MenuTopComp'
import AllProductsPage from './page/admin/products/AllProductsPage'
import CreateProductPage from './page/admin/products/CreateProductPage'

// ACT
import { CartAct } from "./actions/CartAct";


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default function Main(props) {
    const dispatch = useDispatch();
    const [typeUserState , setTypeUserState] = useState("");
    const [subUrlState , setSubUrlState] = useState([]);
    const navbarMenu = {
        paddingTop : "1rem"
    }

    const inStoreCart = useSelector(state => {
        return state.CsCartRedu;
    });

    useEffect(()=>{
        setCart();
        let url = window.location
        let typeUser = url.pathname.split("/")[1];
        setSubUrlState(url.pathname.split("/"));
        setTypeUserState(typeUser);
    },[])

    const setCart = () => {
        let payload = inStoreCart
        if(!localStorage.getItem("listForCart")){
            payload.listForCart = []
        }else{
            payload.listForCart = JSON.parse(localStorage.getItem("listForCart"))
        }
        
        dispatch({ type: CartAct.LOAD_DATA, ...payload, payload });
    } 

    return (
        <>
        <Router>
        {typeUserState !== "admin" ?
        <>
        <NavBarTopComp/>
        <div style={{zIndex : "99"}}>
            <div className="row text-center" style={{marginRight :"0px" ,marginLeft :"0px"}}>
                <MenuTopComp/>
            </div>
        </div>
        <CartButtonComp/>
        <OpenChatComp/>
        
        </>
        : 
        <>
            {subUrlState[2] !== "login" 
            ? 
            <><AdminMenuTopComp/></> 
            : 
            <></>}
        </>
        }
        <TopUpComp/>
        

        
            <Switch>
            {/* <Route path="/">
                <HomePage/>
            </Route> */}
            <Route path="/home">
                <HomePage/>
            </Route>
            <Route path="/product/:key">
                <ProductPage />
            </Route>
            <Route path="/catalog/:type">
                <CatalogPage/>
            </Route>
            <Route path="/login">
                <LoginPage/>
            </Route>
            <Route path="/register">
                <RegisterPage/>
            </Route>
            <Route path="/cart">
                <CartPage/>
            </Route>
            <Route path="/shipment-info">
                <ShipmentInfoPage/>
            </Route>
            <Route path="/payment">
                <PaymentPage/>
            </Route>
            <Route path="/order-status">
                <ProductStepPage/>
            </Route>


            {/* Admin */}
            <Route path="/admin/login">
                <LoginAdminPage/>
            </Route>
            <Route path="/admin/dashboard">
                <DashboardPage/>
            </Route>
            <Route path="/admin/all-product">
                <AllProductsPage/>
            </Route>
            <Route path="/admin/product/:event/:id">
                <CreateProductPage/>
            </Route>
            </Switch>
        </Router>
        <FooterComp/>
            
        </>
    )
}