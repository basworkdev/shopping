import React , {useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CartAct } from "../actions/CartAct";

// Comp 
import OrderSummaryComp from "../componenst/OrderSummaryComp";

// Apis
import OrderApi from "../apis/OrderApi"
export default function PaymentPage(props) {
    let history = useHistory();
    const dispatch = useDispatch();
    let moment = require('moment');
    let inStoreCart = useSelector(state => {
        return state.CsCartRedu;
    });

    useEffect(()=>{
    })
    const saveOrder = async () => {
        let orderSummary = inStoreCart.OrderSummary;
        let customer = JSON.parse(localStorage.getItem("customerAddress"));
        let id = moment().format("YYMMDDHHmmss").toString() + (Math.floor(Math.random()*(999-100+1)+100)).toString();
        console.log("id " , id)
        
        let data = {
            id : id,
            amount : orderSummary.sumNumOrder,
            sum_full_price : orderSummary.sumFullPrice,
            sum_discount : orderSummary.sumDiscount,
            sum_price : orderSummary.sumPrice,
            sum_shipping_cost : orderSummary.sumDeliveryCost,
            total : orderSummary.sumAllPrice,
            customer_name : customer.name,
            customer_tel : customer.tel,
            customer_email : customer.email,
            customer_address : customer.address,
            customer_province : customer.provinceName,
            customer_amphure : customer.amphureName,
            customer_district : customer.districtName,
            customer_postcode : customer.postcode,
            order_time : new Date(),
            pay_status : "Y",
            status : "P",
            delivery_number : "",
            delivery_company : "",
            delivery_date : "",
            user_id : "",
            orderDetail : inStoreCart.listForCart
        }
        // return null\
        debugger
        const resp = await OrderApi.doserviceSaveOrder(data);
        console.log(resp)
        if(resp.code === 1) {
            localStorage.removeItem("listForCart");
            let payload = inStoreCart;
            payload.OrderSummary = {};
            payload.listForCart = [];
            dispatch({ type: CartAct.LOAD_DATA, payload });
        }
        history.push("/order-status")
    }

    return <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <center><button onClick={()=>{saveOrder()}}>ชำระเงินสำเร็จ</button></center>
        
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div hidden>
            <OrderSummaryComp btnText="ชำระเงิน" type="submit"/>
        </div>
    </>
}