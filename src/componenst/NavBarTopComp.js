import React , {useState , useEffect} from "react";
export default function NavBarTopComp(props) {
    return (
        <>
        <div style={{width:"100%" , backgroundColor : "#000000"}}>
            <div className="container">
                <ul class="nav justify-content-end bg-primary nav-top-bar-icon" style={{padding : "5px 0px 5px 0px"}}>
                    {/* <li class="nav-item">
                        <a class="nav-link text-white" href="#"><i class="fab fa-facebook-square"></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#"><i class="fab fa-youtube"></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#"><i class="fab fa-line"></i></a>
                    </li> */}
                    <li class="nav-item nav-item-top">
                        <font>ติดตามสินค้า</font>
                    </li>
                    <li class="nav-item">
                        <button type="button"  class="btn btn-outline-light btn-sm">ลงชื่อเข้าใช้</button>
                    </li>
                    <li class="nav-item" style={{paddingLeft : "20px"}}>
                        <div className="basket">
                            <i class="fas fa-shopping-basket"></i>
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