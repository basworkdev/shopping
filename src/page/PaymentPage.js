import React , {useState , useEffect} from "react";
import { useHistory } from "react-router-dom";

export default function PaymentPage(props) {
    let history = useHistory();

    return <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <center><button onClick={()=>{history.push("/order-status")}}>ชำระเงินสำเร็จ</button></center>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    </>
}