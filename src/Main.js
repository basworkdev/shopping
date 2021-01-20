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

// Components
import OpenChatComp from './componenst/OpenChatComp'
import NavBarTopComp from './componenst/NavBarTopComp'
import MenuTopComp from './componenst/MenuTopComp'

// Page
import HomePage from './page/HomePage'
import ProductPage from './page/ProductPage'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default function Main(props) {

    const navbarMenu = {
        paddingTop : "1rem"
    }
    return (
        <>

        <NavBarTopComp/>
        <div className="container" style={{zIndex : "99"}}>
            <div className="row text-center">
                <MenuTopComp/>
            </div>
        </div>
        {/* <HomePage/> */}
        <OpenChatComp/>

        <Router>
            <Switch>
            <Route path="/home">
                <HomePage/>
            </Route>
            <Route path="/product">
                <ProductPage />
            </Route>
            </Switch>
        </Router>
            
        </>
    )
}