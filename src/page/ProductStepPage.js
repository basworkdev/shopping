import React , {useState , useEffect} from "react";
import { BrowserRouter as Router, useParams ,useHistory } from "react-router-dom";
import tc from "../config/text.json"

// Comp
import OrderStepComp from '../componenst/OrderStepComp'
import OrderSumDetailComp from "../componenst/OrderSumDetailComp";
import DeliveryAddressComp from "../componenst/DeliveryAddressComp";

//Apis
import OrderApi from "../apis/OrderApi"


export default function ProductStepPage(props) {
    const {orderId} = useParams();
    const [orderMainState,setOrderMainState] = useState([]);
    const [orderState,setOrderState] = useState([]);
    const [statusState,setStatusState] = useState("");

    useEffect(()=>{
        nowStatus()
    },[])

    const nowStatus = async () => {
        let mainOrder = await OrderApi.doserviceGetOrderById(orderId);
        let resp = await OrderApi.doserviceGetOrderAndOrderDetail(orderId);
        console.log(resp);
        setOrderState(resp)
        setOrderMainState(mainOrder);
        if(resp.length>0) {
            checkStatus(resp[0]);
        }
        
    }

    const checkStatus = (order) => {
        let data = {
            text : "",
            step : 0
        }
        if(order.status === "UPLOADSLIP") {
            data.step = 1
            data.text = tc.statusOrder.UPLOADSLIP
        } else if(order.status === "PAY") {
            data.step = 1
            data.text = tc.statusOrder.PAY
        } else if(order.status === "PACKED") {
            data.step = 2
            data.text = tc.statusOrder.PACKED
        } else if(order.status === "DELIVER") {
            data.step = 3
            data.text = tc.statusOrder.DELIVER
        } else if(order.status === "SUCCESS") {
            data.step = 4
            data.text = tc.statusOrder.SUCCESS
        }
        console.log(data)
        setStatusState(data);
    }

    return <>
    <div style={{marginTop : "50px", paddingBottom : "100px"}}>
        <div className="container">
            <h5 className="text-center text-secondary">สถานะการสั่งซื้อ</h5>
            <h5 className="text-center text-secondary">คำสั่งซื้อหมายเลข : <span className="font-weight-bold">{orderId}</span></h5>
            <h2 className="text-center font-weight-bold" style={{marginTop : "30px"}}>({statusState ? statusState.text : "ไม่พบคำสั่งซื้อนี้"})</h2>
            {statusState ?
            <>
                <div style={{marginTop : "30px"}}>
                    <OrderStepComp order={orderMainState} status={statusState}/>
                </div>
                <div style={{marginTop : 50}}>
                {orderState ? <OrderSumDetailComp order={orderState}/> : <></>}
                </div> 
                <div style={{marginTop : 30}}>
                    {orderMainState ? <DeliveryAddressComp order={orderMainState}/> : <></>}
                </div>
            </>
            : 
            <></>
            }
            
        </div>
    </div>
    </>
}