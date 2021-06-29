import React , {useState , useEffect} from "react";
import { BrowserRouter as Router, useParams ,useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CartAct } from "../actions/CartAct";

// Comp 
import OrderSumDetailComp from "../componenst/OrderSumDetailComp";
import SpinnerComp from "../componenst/SpinnerComp";

// CSS
import "../assets/css/paymnet-page.css"

// Apis
import OrderApi from "../apis/OrderApi"
export default function PaymentPage(props) {
    const {orderId} = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    let moment = require('moment');
    let inStoreCart = useSelector(state => {
        return state.CsCartRedu;
    });
    const [spinnerState,setSpinnerState] = useState(false);
    const [orderState,setOrderState] = useState([]);

    useEffect(()=>{
        getOrderAndOrderDetail();
    },[])

    const getOrderAndOrderDetail = async () => {
        setSpinnerState(true)
        let resp = await OrderApi.doserviceGetOrderAndOrderDetail(orderId);
        console.log(resp)
        setOrderState(resp)
        setSpinnerState(false);
    }

    const saveOrder = async () => {
        
        history.push(`/order-status/${orderId}`)
    }

    return <>
    <SpinnerComp spinner={spinnerState}/>
    <div style={{marginTop : "50px"}}>
    <div className="container">
        <div className="row">
            <div className="col-md-8">
            <h1>ชำระเงิน รหัสคำสั่งซื้อ : <b>{orderId}</b></h1>
                <div style={{paddingTop:10}}>
                    <h5 className="font-weight-bold">รายละเอียด</h5>
                    <p>
                        1. ตรวจสอบยอดชำระของท่าน <br/>
                        2. โอนเงินเข้าบัญชีธนาคารตามเลขบัญชีด้านล่าง <br/>
                        3. อัพโหลดหลักฐานการโอนในช่องอัพโหลดหลักฐานการโอน ไม่ว่าจะเป็นรูปถ่ายสลิปการโอน หรือรูปภาพสลิปการโอนจากแอพพลิเคชันต่างๆ หรือสามารถแจ้งหลักฐานการโอนได้ในช่องแชต ช่องทางต่างๆของทางร้าน <br/>

                        <b>หมายเหตุ : </b>สามารถติดต่อสอบถามข้อมูลเพิ่มเติมได้ที่ โทร 0877777777
                    </p>
                    
                    <h5 className="font-weight-bold">ชำระผ่านธนาคาร</h5>
                    <table className="table-bank">
                        <tr>
                            <td rowSpan="2">
                                <img src='../image/SCB-logo.png' width="50"/>
                            </td>
                            <td className="td-bank">
                                ธนาคารไทยพาณิชย์
                            </td>
                        </tr>
                        <tr>
                            <td className="td-bank">
                                000-0000-000
                            </td>
                        </tr>
                    </table>
                    <table className="table-bank">
                        <tr>
                            <td rowSpan="2">
                                <img src='../image/K-bank-logo.png' width="50"/>
                            </td>
                            <td className="td-bank">
                                ธนาคารกสิกรไทย
                            </td>
                        </tr>
                        <tr>
                            <td className="td-bank">
                                000-0000-000
                            </td>
                        </tr>
                    </table>
                    <table className="table-bank">
                        <tr>
                            <td rowSpan="2">
                                <img src='../image/krungsri-logo.png' width="50"/>
                            </td>
                            <td className="td-bank">
                                ธนาคารกรุงศรี
                            </td>
                        </tr>
                        <tr>
                            <td className="td-bank">
                                000-0000-000
                            </td>
                        </tr>
                    </table>
                    <p>ชื่อบัญชี : <span className="font-weight-bold">นายสราวุธ  ถนมอสัตย์</span></p>
                </div>
            </div>
            <div className="col-md-4">
                <div style={{marginTop : "-10px"}}>
                    {orderState ? <OrderSumDetailComp order={orderState}/> : <></>}
                </div>
            </div>
        </div>
            
            <br/>
            <div className="box-payment">
            <p className="text-secondary text-center">ยังไม่มีเอกสาร</p>
            <center><button type="button" class="btn btn-danger">อัพโหลดหลักฐานการชำระเงิน (คลิก)</button></center>
            </div>
            <br/>
            <center><button type="button" class="btn btn-primary" onClick={()=>{saveOrder()}}>ส่งหลักฐานการชำระเงิน</button></center>
    </div>
    </div>
        

        <br/>
        <br/>
    </>
}