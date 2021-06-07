import React , {useState , useEffect} from "react";

// CSS
import '../assets/css/step-bar.css'

export default function OrderStepComp(props) {


    return <>

    {/* desktop */}
    <div className="desktop">
    <div class="md-stepper-horizontal orange">
        <div class="md-step active done">
            <div class="md-step-circle"><span>1</span></div>
            <div class="md-step-title">ชำระเงินเรียบร้อย</div>
            <div class="md-step-bar-left"></div>
            <div class="md-step-bar-right"></div>
        </div>
        <div class="md-step active editable">
            <div class="md-step-circle"><span>2</span></div>
            <div class="md-step-title">สินค้าถูกบรรจุลงกล่องเรียบร้อย</div>
            <div class="md-step-bar-left"></div>
            <div class="md-step-bar-right"></div>
        </div>
        <div class="md-step active send">
            <div class="md-step-circle"><span></span></div>
            <div class="md-step-title">สินค้าถูกส่งโดย : ไปรษณ์ไทย</div>
            <div class="md-step-optional">เช็คสถานนะพัสดุ : คลิก</div>
            <div class="md-step-bar-left"></div>
        <div class="md-step-bar-right"></div>
        </div>
        <div class="md-step success">
            <div class="md-step-circle"><span></span></div>
            <div class="md-step-title">สินค้าถูกจัดส่งเรียบร้อย</div>
            <div class="md-step-bar-left"></div>
            <div class="md-step-bar-right"></div>
        </div>
    </div> 
    </div>   

{/* mobile */}
    <div className="mobile">
    <div className="container">
        <div class="wrapper">
            <ul class="StepProgress">
                <li class="StepProgress-item is-pay active"><strong>ชำระเงินเรียบร้อย</strong></li>
                <li class="StepProgress-item is-box active"><strong>สินค้าถูกบรรจุลงกล่องเรียบร้อย</strong></li>
                <li class="StepProgress-item is-send text-black-50">
                    <strong>สินค้าถูกส่งโดย : ไปรษณ์ไทย</strong>
                    เช็คสถานนะพัสดุ : คลิก
                    </li>
                <li class="StepProgress-item is-success text-black-50"><strong>สินค้าถูกจัดส่งเรียบร้อย</strong></li>
            </ul>
        </div>
    </div>
    </div>

    </>
}