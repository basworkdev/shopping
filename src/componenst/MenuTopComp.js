import React , {useState , useEffect} from "react";
import { useHistory } from "react-router-dom";

// Comp
import SearchComp from './SearchComp'
export default function MenuTopComp(props) {
    let history = useHistory();
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary text-left" style={{width:"100%"}}>
            <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <SearchComp/>
            <a className="navbar-brand logo-menu" style={{cursor : "pointer"}} onClick={()=>history.push("/home")}><img src="../image/logo2.png" width="80px"/></a>
            
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <a className="nav-link" href="#">หน้าหลัก <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">สินค้า</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">ติดต่อเรา</a>
                </li>
                </ul>
                <div className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-3" type="search" placeholder="ค้นหาสินค้า" aria-label="Search" style={{borderRadius : "1.1rem"}}/>
                    <button className="btn btn-outline-secondary my-2 my-sm-0 btn-sm" type="submit"><i className="fas fa-search"></i></button>
                </div>
            </div>
            </div>
            </nav>
        </>
    )
}