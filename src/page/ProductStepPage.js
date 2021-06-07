import React , {useState , useEffect} from "react";

// Comp
import OrderStepComp from '../componenst/OrderStepComp'

export default function ProductStepPage(props) {


    return <>
    <div style={{marginTop : "50px", paddingBottom : "100px"}}>
        <div className="container">
            <h5 className="text-center text-secondary">สถานะการสั่งซื้อ</h5>
            <h5 className="text-center text-secondary">คำสั่งซื้อหมายเลข : <span className="font-weight-bold">399297376943761</span></h5>
            <h2 className="text-center font-weight-bold" style={{marginTop : "30px"}}>(สินค้าถูกส่งโดย : ไปรษณ์ไทย)</h2>
            <div style={{marginTop : "30px"}}>
                <OrderStepComp/>
            </div>
        </div>
    </div>
    </>
}