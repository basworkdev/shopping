import React , {useState , useEffect} from "react";
import tc from "../config/text.json"

// CSS
import '../assets/css/step-bar.css'

export default function OrderStepComp(props) {
    const [orderState,setOrderState] = useState({});
    useEffect(()=>{
        setOrderState(props.order[0])
    },[props.order])

    return <>

    {/* desktop */}
    {orderState ? 
        <div className="desktop">
            <div className="md-stepper-horizontal orange">
                <div className={`md-step done ${props.status.step >= 1 ? "active" : ""}`}>
                    <div className="md-step-circle"><span>1</span></div>
                    <div className="md-step-title">{orderState.status === "UPLOADSLIP" ? tc.statusOrder.UPLOADSLIP : tc.statusOrder.PAY}</div>
                    <div className="md-step-bar-left"></div>
                    <div className="md-step-bar-right"></div>
                </div>
                <div className={`md-step editable ${props.status.step >= 2 ? "active" : ""}`}>
                    <div className="md-step-circle"><span>2</span></div>
                    <div className="md-step-title">{tc.statusOrder.PACKED}</div>
                    <div className="md-step-bar-left"></div>
                    <div className="md-step-bar-right"></div>
                </div>
                <div className={`md-step send ${props.status.step >= 3 ? "active" : ""}`}>
                    <div className="md-step-circle"><span></span></div>
                    {orderState.delivery_company ?
                    <>
                    <div className="md-step-title">{tc.statusOrder.DELIVER}โดย : {orderState.delivery_company}</div>
                    <div className="md-step-optional">เลขพัสดุ : <span className="font-weight-bold">{orderState.delivery_number}</span></div>
                    <div className="md-step-optional">เช็คสถานนะพัสดุ : <a href={orderState.delivery_trace} target="_blank"><span className="font-weight-bold">คลิก</span></a></div>
                    </>
                    : 
                    <>
                    <div className="md-step-title">{tc.statusOrder.DELIVER}</div>
                    </>
                    }
                    

                    <div className="md-step-bar-left"></div>
                <div className="md-step-bar-right"></div>
                </div>
                <div className={`md-step success ${props.status.step >= 4 ? "active" : ""}`}>
                    <div className="md-step-circle"><span></span></div>
                    <div className="md-step-title">{tc.statusOrder.SUCCESS}</div>
                    <div className="md-step-bar-left"></div>
                    <div className="md-step-bar-right"></div>
                </div>
            </div> 
        </div>   
    : 
    <></>
    }
    

{/* mobile */}
    {orderState ? 
        <div className="mobile">
        <div className="container">
            <div className="wrapper">
                <ul className="StepProgress">
                    <li className={`StepProgress-item is-pay ${props.status.step >= 1 ? "active" : "text-black-50 "}`}><strong>{orderState.status === "UPLOADSLIP" ? tc.statusOrder.UPLOADSLIP : tc.statusOrder.PAY}</strong></li>
                    <li className={`StepProgress-item is-box ${props.status.step >= 2 ? "active" : "text-black-50"}`}><strong>{tc.statusOrder.PACKED}</strong></li>
                    <li className={`StepProgress-item is-send ${props.status.step >= 3 ? "active" : "text-black-50"}`}>
                        {orderState.delivery_company ?
                        <>
                        <strong>{tc.statusOrder.DELIVER}โดย : {orderState.delivery_company}</strong>
                        <p>เลขพัสดุ : <span className="font-weight-bold">{orderState.delivery_number}</span> </p>
                        <a href={orderState.delivery_trace} target="_blank"><p style={{marginTop : "-5px"}}>เช็คสถานนะพัสดุ : <span className="font-weight-bold">คลิก</span></p></a>
                        </>
                        : 
                        <>
                        <strong>{tc.statusOrder.DELIVER}</strong>
                        </>
                        }
                    </li>
                    <li className={`StepProgress-item is-success ${props.status.step >= 4 ? "active" : "text-black-50"}`}><strong>{tc.statusOrder.SUCCESS}</strong></li>
                </ul>
            </div>
        </div>
        </div>
    :<></>
    }
    </>
}