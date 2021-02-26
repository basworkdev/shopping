import React , {useState , useEffect} from "react";
import '../assets/css/search-comp.css'
export default function SearchComp(props) {
    return (
        <>
        <div className="search-box">
            <form className="form-search" action="">
                <input type="search" className="input-search"/>
                <i className="fa fa-search"></i>
            </form>
        </div>
        </>
    )
}