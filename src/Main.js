import React , {useState , useEffect} from "react";

// CSS
import './assets/bootstrap-4.5.3/css/bootstrap-grid.css'
import './assets/bootstrap-4.5.3/css/bootstrap-reboot.css'
import './assets/bootstrap-4.5.3/css/bootstrap.css'
import './assets/css/main.css'
import './assets/fontawesome-free-5.15.1-web/css/all.css'

// JS
import $ from "jquery"
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Admin Page
import LoginPage from './page/admin/LoginPage'

// Page
import HomePage from './page/HomePage'
import ProductPage from './page/ProductPage'
import CatalogPage from './page/CatalogPage'

// Components
import OpenChatComp from './componenst/OpenChatComp'
import NavBarTopComp from './componenst/NavBarTopComp'
import MenuTopComp from './componenst/MenuTopComp'
import FooterComp from './componenst/FooterComp'
import TopUpComp from './componenst/TopUpComp'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default function Main(props) {
    const [typeUserState , setTypeUserState] = useState("");

    const navbarMenu = {
        paddingTop : "1rem"
    }

    useEffect(()=>{
        let url = window.location
        let typeUser = url.pathname.split("/")[1];
        setTypeUserState(typeUser);
    },[])
    return (
        <>
        <Router>
        {typeUserState === "admin" ?
        <>
        
        </>
        : 
        <>
            <NavBarTopComp/>
            <div style={{zIndex : "99"}}>
                <div className="row text-center" style={{marginRight :"0px" ,marginLeft :"0px"}}>
                    <MenuTopComp/>
                </div>
            </div>
            <OpenChatComp/>
            <TopUpComp/>
        </>
        }
        

        
            <Switch>
            <Route path="/home">
                <HomePage/>
            </Route>
            <Route path="/product">
                <ProductPage />
            </Route>
            <Route path="/catalog">
                <CatalogPage/>
            </Route>


            {/* Admin */}
            <Route path="/admin/login">
                <LoginPage/>
            </Route>
            </Switch>
        </Router>
        <FooterComp/>
            
        </>
    )
}