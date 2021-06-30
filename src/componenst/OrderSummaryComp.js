import React , {useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartAct } from "../actions/CartAct";
import bootbox from 'bootbox';
import tc from '../config/text.json'

// css
import "../assets/css/cart-page.css"

// API
import proApis from "../apis/ProductsApi";

// Comp
import CardProductComp from "../componenst/CardProductComp"

export default function OrderSummaryComp(props) {
    const numeral = require('numeral');
    const dispatch = useDispatch();
    const tcv = tc.validate;
    let inStoreCart = useSelector(state => {
        return state.CsCartRedu.listForCart;
    });
    let inStoreCartRedu = useSelector(state => {
        return state.CsCartRedu;
    });
    let _ = require('lodash');

    const [sumOrderState , setSumOrderState] = useState({})

    useEffect(()=>{
        sumOrderFunction()
    },[inStoreCartRedu.update,inStoreCart])


    const sumOrderFunction = () => {
        let sumPrice = 0;
        let sumFullPrice = 0;
        let sumDeliveryCost = 0;
        let sumNumOrder = 0;
        let sumDiscount  = 0;
        let sumAllPrice = 0;
        for (let i=0 ; i<inStoreCart.length ; i++) {
            let data = inStoreCart[i];
            sumFullPrice += (data.fullPrice*data.order)
            sumPrice += (data.price*data.order)
            sumDeliveryCost += (data.deliveryCost*data.order)
            sumNumOrder += data.order
            sumDiscount += (data.fullPrice-data.price)*data.order
            
        }
        sumDiscount = sumFullPrice-sumPrice;
        sumAllPrice = sumPrice+sumDeliveryCost;
        
        let sumOrder = {
            sumPrice : sumPrice,
            sumFullPrice : sumFullPrice,
            sumNumOrder : sumNumOrder,
            sumDeliveryCost : sumDeliveryCost,
            sumDiscount : sumDiscount,
            sumAllPrice : sumAllPrice
        }
        let payload = inStoreCartRedu
        payload.OrderSummary = sumOrder;
        dispatch({ type: CartAct.LOAD_DATA, payload });
        setSumOrderState(sumOrder);
    }

    const checkButton = () => {
        if(props.type === "submit") {
            return <button className="btn btn-danger btn-block btn-lg" type="submit">{props.btnText}</button>
        }else if(props.type === "hidden") {
            return <></>
        }else {
            return <button className="btn btn-danger btn-block btn-lg" onClick={()=>window.location=props.link}>{props.btnText}</button>
        }
    }

    return <>
    <div className="setail-sum-cart bg-primary">
        <h4>สรุปรายการสั่งซื้อ</h4>
        <div className="row">
            <div className="col-7 text-white-50">
                <p>ยอดรวม ( จำนวน {sumOrderState.sumNumOrder} ชิ้น )</p>
            </div>
            <div className="col-5 text-right">
                <p>{numeral(sumOrderState.sumFullPrice).format('0,0')} บ.</p>
            </div>
            <div className="col-7 text-white-50">
                <p>ส่วนลด</p>
            </div>
            <div className="col-5 text-right">
                <p>{numeral(sumOrderState.sumDiscount).format('0,0')} บ.</p>
            </div>
            <div className="col-7 text-white-50">
                <p>รวม</p>
            </div>
            <div className="col-5 text-right">
                <p>{numeral(sumOrderState.sumPrice).format('0,0')} บ.</p>
            </div>

            <div className="col-7 text-white-50">
                <p>ค่าจัดส่ง</p>
            </div>
            <div className="col-5 text-right">
                <p>{numeral(sumOrderState.sumDeliveryCost).format('0,0')} บ.</p>
            </div>

            <div className="col-7 text-white-50">
                <p>ยอดรวมทั้งหมด</p>
            </div>
            <div className="col-5 text-right">
                <p  style={{fontSize:"1.7rem"}} className="font-weight-bold">{numeral(sumOrderState.sumAllPrice).format('0,0')} บ.</p>
            </div>
        </div>
        <br/>
        {/* {props.type === "submit" ?
        <button className="btn btn-danger btn-block" type="submit">{props.btnText}</button>
        :
        <button className="btn btn-danger btn-block" onClick={()=>window.location=props.link}>{props.btnText}</button>
        } */}
        {checkButton()}
        
            
    </div>
    </>
}