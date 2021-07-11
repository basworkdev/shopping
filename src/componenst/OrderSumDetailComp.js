import React , {useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartAct } from "../actions/CartAct";
import bootbox from 'bootbox';
import tc from '../config/text.json'

// Apis
import OrderApi from "../apis/OrderApi"


export default function OrderSumDetailComp(props) {
    const numeral = require('numeral');
    const tcv = tc.validate;
    const [orderState,setOrderState] = useState([]);

    useEffect(()=>{
        setOrderState(props.order)
    },[props.order])
    
    const setOrderList = () => {
        return orderState.map((data)=>{
            return <>
                <div className="col-8"><p>{data.name}</p></div>
                <div className="col-4 text-right">{data.order_amount} x {numeral(data.price).format('0,0')} บ.</div>
            </>
        })
    }

    return <>
    <hr/>
    <h4><b>รายละเอียดการสั่งซื้อ</b></h4>
    <div>
    <div className="row">
        {setOrderList()}
    </div>
    </div>
    <div className="setail-sum-cart bg-primary" style={{marginTop : 10}}>
        <h4>สรุปยอด</h4>
        <div className="row">
            <div className="col-7 text-white-50">
                <p>ยอดรวม ( จำนวน {orderState[0] ? orderState[0].amount : 0} ชิ้น )</p>
            </div>
            <div className="col-5 text-right">
                <p>{orderState[0] ? numeral(orderState[0].sum_full_price).format('0,0') : 0} บ.</p>
            </div>
            <div className="col-7 text-white-50">
                <p>ค่าจัดส่ง</p>
            </div>
            <div className="col-5 text-right">
                <p>{orderState[0] ? numeral(orderState[0].sum_shipping_cost).format('0,0') : 0} บ.</p>
            </div>

            <div className="col-7 text-white-50">
                <p>ยอดรวมทั้งหมด</p>
            </div>
            <div className="col-5 text-right">
                <p  style={{fontSize:"1.7rem"}} className="font-weight-bold">{ orderState[0] ? numeral(orderState[0].total).format('0,0') : 0} บ.</p>
            </div>
        </div>
        <br/>
        {/* {props.type === "submit" ?
        <button className="btn btn-danger btn-block" type="submit">{props.btnText}</button>
        :
        <button className="btn btn-danger btn-block" onClick={()=>window.location=props.link}>{props.btnText}</button>
        } */}
        
            
    </div>
    </>
}