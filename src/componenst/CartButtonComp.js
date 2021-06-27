import React , {useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import '../assets/css/cart-page.css'
import '../assets/css/open-chat.css'
export default function CartButtonComp(props) {
    const dispatch = useDispatch();
    const inStoreCart = useSelector(state => {
        return state.CsCartRedu;
    });
    let history = useHistory();
    return (
        <>
        {inStoreCart.listForCart.length>0 ?
        <div class="cart-button-container pointer" onClick={()=>window.location='/cart'}>
            <div class="floating-button">
                <div class="font-icon">
                    <div class="container-btn-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <div class="top-right-btn-cart">
                            <div className="order-cart-btn" hidden={inStoreCart.listForCart.length === 0}></div>
                            <div className="num-order-btn font-weight-bold" hidden={inStoreCart.listForCart.length === 0}>{inStoreCart.listForCart.length > 0 ? inStoreCart.listForCart.length : ""}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         :
        <></>}
        
        </>
    )
}