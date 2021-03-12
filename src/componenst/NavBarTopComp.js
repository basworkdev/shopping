import React , {useState , useEffect} from "react";
import { useHistory } from "react-router-dom";

export default function NavBarTopComp(props) {
    let history = useHistory();
    return (
        <>
        <div style={{width:"100%" , backgroundColor : "#5d5d5d"}}>
            <div className="container">
                <ul className="nav justify-content-end bg-secondary text-white nav-top-bar-icon" style={{padding : "5px 0px 5px 0px"}}>
                    {/* <li className="nav-item">
                        <a className="nav-link text-white" href="#"><i className="fab fa-facebook-square"></i></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#"><i className="fab fa-youtube"></i></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#"><i className="fab fa-line"></i></a>
                    </li> */}
                    <li className="nav-item nav-item-top">
                        <font>ติดตามสินค้า</font>
                    </li>
                    <li className="nav-item">
                        <button type="button"  className="btn btn-outline-light btn-sm" onClick={()=>history.push("/login")}>ลงชื่อเข้าใช้</button>
                    </li>
                    <li className="nav-item" style={{paddingLeft : "20px"}}>
                        <div className="basket">
                            <i className="fas fa-shopping-basket"></i>
                            <div className="in-basket"></div>
                            <div className="num-in-basket">5</div>
                        </div>
                    </li>
                    
                </ul>
                
            </div>
        </div>
        </>
    )
}