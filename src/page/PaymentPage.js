import React , {useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CartAct } from "../actions/CartAct";

// Comp 
import OrderSummaryComp from "../componenst/OrderSummaryComp";

// CSS
import "../assets/css/paymnet-page.css"

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
    <div style={{marginTop : "50px"}}>
    <div className="container">
        <h1>ชำระเงิน</h1>
        <div className="row">
            <div className="col-md-8">
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
                <div>
                    <OrderSummaryComp btnText="ชำระเงิน" type="hidden"/>
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