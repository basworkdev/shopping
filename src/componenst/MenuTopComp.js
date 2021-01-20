import React , {useState , useEffect} from "react";
import SearchComp from './SearchComp'
export default function MenuTopComp(props) {
    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-white text-left" style={{width:"100%"}}>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <SearchComp/>
            <a class="navbar-brand logo-menu" href="#"><img src="../image/logo.png" width="80px"/></a>
            
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
                </ul>
                <div class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-3" type="search" placeholder="ค้นหาสินค้า" aria-label="Search" style={{borderRadius : "1.1rem"}}/>
                    <button class="btn btn-outline-secondary my-2 my-sm-0 btn-sm" type="submit"><i class="fas fa-search"></i></button>
                </div>
            </div>
            </nav>
        </>
    )
}