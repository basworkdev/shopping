import React , {useState , useEffect} from "react";
import { BrowserRouter as Router, useParams ,useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CartAct } from "../actions/CartAct";
import tc from "../config/text.json"
import bootbox from 'bootbox';

// Comp 
import OrderSumDetailComp from "../componenst/OrderSumDetailComp";
import SpinnerComp from "../componenst/SpinnerComp";
import UploadImmagePaySlipComp from "../componenst/UploadImmagePaySlipComp";
import DeliveryAddressComp from "../componenst/DeliveryAddressComp";

// CSS
import "../assets/css/paymnet-page.css"

// Apis
import OrderApi from "../apis/OrderApi"
import MainApi from "../apis/MainApi"
export default function PaymentPage(props) {
    const {orderId} = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    let moment = require('moment');
    let inStoreCart = useSelector(state => {
        return state.CsCartRedu;
    });
    const [spinnerState,setSpinnerState] = useState(false);
    const [orderMainState,setOrderMainState] = useState([]);
    const [orderState,setOrderState] = useState([]);
    const [imageState,setImageState] = useState();
    const [showImageState , setShowImageState] = useState();

    useEffect(()=>{
        getOrderAndOrderDetail();
    },[])

    const getOrderAndOrderDetail = async () => {
        setSpinnerState(true)
        let mainOrder = await OrderApi.doserviceGetOrderById(orderId);
        let resp = await OrderApi.doserviceGetOrderAndOrderDetail(orderId);
        console.log(resp)
        setOrderMainState(mainOrder);
        setOrderState(resp)
        setSpinnerState(false);
    }

    const saveOrder = async () => {
        let resp = await MainApi.doserviceUploadImageSlipPay(imageState);
        if(resp.filename) {
            let dataUpdate = {
                orderId : orderId,
                pay_status : "UPLOADSLIP",
                pay_date : new Date(),
                status : "UPLOADSLIP",
                pay_image : `${process.env.REACT_APP_ENGINE_URL}imagesSlipPay/${resp.filename}`
            }
            let respUpdate = await OrderApi.doserviceUpdateSlip(dataUpdate);
            if(respUpdate.code === 1) {
                nextStepPage();
            }
        } else {
            bootbox.alert(tc.validate.errorUploadImage);
        }
        setShowImageState(resp);
        console.log("resp",resp);
        //history.push(`/order-status/${orderId}`)
    }

    const nextStepPage = () => {
        history.push(`/order-status/${orderId}`)
    }

    const checkStatusPay = () => {
        if(orderState && orderState.length > 0) {
            if(orderState[0].pay_status === "PAY") {
                return (
                    <>
                    (<span className="text-success">{tc.statusOrder.SUCCESS}</span>)
                    </>
                )
            }else if (orderState[0].pay_status === "NOT") {
                return (
                    <>
                    </>
                )
            }else if (orderState[0].pay_status === "UPLOADSLIP") {
                return (
                    <>
                    (<span className="text-warning">{tc.statusOrder.UPLOADSLIP}</span>)
                    </>
                )
            }
        }else {
            return (
                <>
                (<span className="text-danger">ไม่พบออเดอร์นี้ กรุณาติดต่อผู้ดูแลระบบ</span>)
                </>
            )
        }
    }
    const statusPayment = () => {
        if(orderState && orderState.length > 0) {
            if(orderState[0].pay_status === "PAY") {
                return(
                    <>
                    <div >
                    <br/>
                    <center>
                        <b><h3 className="text-success">{tc.statusOrder.SUCCESS}</h3></b>
                        <br/>
                        <center><button type="button" class="btn btn-primary btn-lg" onClick={()=>nextStepPage()}>ดูสถานะสินค้า</button></center>
                    </center>
                    </div>
                    </>
                )

            }else if (orderState[0].pay_status === "NOT") {
                return(
                    <>
                    <UploadImmagePaySlipComp 
                        detailShow={showImageState ? false : true} 
                        order={{
                            orderId : orderId,
                            pay_status : "UPLOADSLIP",
                            status : "UPLOADSLIP"
                        }} 
                        nextStepPage={`/order-status/${orderId}`}
                        />
                    
                    <br/>                    
                    </>
                )

            }else if (orderState[0].pay_status === "UPLOADSLIP") {
                return(
                    <>
                    <div >
                    <br/>
                    <center>
                        <b><h3 className="text-warning">{tc.statusOrder.UPLOADSLIP}</h3></b>
                        <br/>
                        <center><button type="button" class="btn btn-primary btn-lg" onClick={()=>nextStepPage()}>ดูสถานะสินค้า</button></center>
                    </center>
                    </div>
                    </>
                )
            }
        }
    }
    return <>
    <SpinnerComp spinner={spinnerState}/>
    <div style={{marginTop : "50px"}}>
    <div className="container">
        <div className="row">
            <div className="col-md-8">
            <h1>ชำระเงิน รหัสคำสั่งซื้อ : <b>{orderId}</b> </h1>
            <h3>{checkStatusPay()}</h3>
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
                <div style={{marginTop : 20}}>
                    {orderMainState ? <DeliveryAddressComp order={orderMainState}/> : <></>}
                </div>
            </div>
        </div>
        <div style={{marginTop : 2}}>
            {statusPayment()}
        </div>
        </div>
    </div>
        

        <br/>
        <br/>
    </>
}