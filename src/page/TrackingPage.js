import React , {useState , useEffect} from "react";
import { BrowserRouter as Router, useParams ,useHistory } from "react-router-dom";

// Comp
import RecommendProductComp from "../componenst/RecommendProductComp";
import BillboardComp from "../componenst/BillboardComp";
import SpinnerComp from "../componenst/SpinnerComp"

//Apis
import OrderApi from '../apis/OrderApi'

//CSS
import '../assets/css/tracking-page.css'

export default function TrackingPage(props) {
    let moment = require('moment');
    const [typeSearchState , setTypeSearchState] = useState({
        type : "orderId",
        text : "รหัสคำสั่งซื้อ"
    });
    const [textSearchState , setTextSearchState] = useState("");
    const [orderListState , setOrderListState] = useState({data : []});
    const [updateState , setUpdateState] = useState(0)
    const [spinnerState,setSpinnerState] = useState(false);
    const [clickSearchState,setClickSearchState] = useState(false);
    useEffect(()=>{
        // setUpdateState(updateState+1)
    },[])


    const changeType = (e) => {
        let type = e.target.value
        let typeOj = typeSearchState;
        typeOj.type = type;
        if(type === "orderId") {
            typeOj.text = "รหัสคำสั่งซื้อ (210711000000000)"
        }else if (type === "tel") {
            typeOj.text = "หมายเลขโทรศัพท์ตามที่อยู่ที่จัดส่ง (0888888888)"
        }
        console.log(typeOj);
        setTypeSearchState({...typeOj})
    }

    const setTextSearch = (e) => {
        setTextSearchState(e.target.value);
    }

    const search = async () => {
        setSpinnerState(true)
        let data = {}
        if(typeSearchState.type === "orderId") {
            data.column = "id";
        }else if (typeSearchState.type === "tel") {
            data.column = "customer_tel";
        }
        data.value = textSearchState;
        let resp = await OrderApi.doserviceSearchOrder(data)
        orderListState.data = [];
        resp.map(async(dataX , index)=>{
            let detailX = []
            detailX = await OrderApi.doservicesearchOrderDetailByOrderId(dataX.id)
            orderListState.data.push(dataX)
            if(orderListState.data[index]) {
                orderListState.data[index].detail = detailX ? detailX : []   
            }
            if(orderListState.data.length -1 === index) {
                setOrderListState({...orderListState , data : orderListState.data})
            }
        })
        console.log(resp)
        if(resp.length > 0) {
            if(typeSearchState.type === "orderId") {
                checkOrder(resp[0].id)
            }else if(typeSearchState.type === "tel") {
                setOrderListState({...orderListState,data:resp})
            }
        }
        setSpinnerState(false)
        setClickSearchState(true)
    }

    const checkOrder = (orderId) => {
        // window.location.href = `/order-status/${orderId}`
        window.open( `/order-status/${orderId}`, '_blank');
    }

    const orderList = () => {
        return orderListState.data.map((data)=>{
            return (
                <div class="list-group" style={{cursor : "pointer"}}>
                    <a class="list-group-item list-group-item-action" onClick={()=>checkOrder(data.id)}>
                        <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">รหัสคำสั่งซื้อ <span className="font-weight-bold">{data.id}</span></h5>
                        <small>วันที่ <span className="font-weight-bold">{moment(data.order_time).format("DD/MM/YYYY")}</span></small>
                        </div>
                        <p class="mb-1">รายการสินค้า</p>
                        <div style={{marginTop : "-5px"}}>
                        {Array.isArray(data.detail) ? data.detail.map((dataD)=>{
                            return <>
                            <small>{dataD.name} ( {dataD.order_amount} ชิ้น )</small><br/>
                            </>
                        }) : <></>}
                        </div>
                    </a>
                </div>
            )         
        })
        
    }

    return <>
        <SpinnerComp spinner={spinnerState}/>
        <div style={{marginTop : "50px", paddingBottom : "100px"}}>
            <div className="container">
                <h2 className="text-center font-weight-bold" style={{marginTop : "30px"}}>ติดตามสินค้า</h2>
                <p className="text-center text-secondary">สามารถเช็คสถานะสินค้าของท่านได้โดยการกรอก รหัสคำสั่งซื้อ หรือ หมายเลขโทรศัพท์ ได้ที่ช่องด้านล่าง</p>
            </div>
            <div>
                <div className="bg-light" style={{marginTop : 20 , paddingTop : "1.5rem" , paddingBottom : "2rem"}} >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <p className="font-weight-bold">เลือกประเภทการค้นหาจาก</p>
                                <div className="row">
                                    <div className="col-5 col-md-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="type" value="orderId" checked={typeSearchState.type==="orderId"} onClick={(e)=>changeType(e)}/>
                                            <label class="form-check-label">
                                                รหัสคำสั่งซื้อ
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="type"  value="tel" checked={typeSearchState.type==="tel"} onClick={(e)=>changeType(e)}/>
                                            <label class="form-check-label">
                                                หมายเลขโทรศัพท์
                                            </label>
                                        </div>
                                    </div>
                                        
                                </div>
                            
                                <div className="row">
                                    <div className="col-9">
                                        <div class="input-group flex-nowrap" style={{marginTop:10}}>
                                            <div class="input-group-prepend">
                                                <span className="input-group-text bg-white" id="addon-wrapping"><i class="fas fa-search"></i></span>
                                            </div>
                                            <input 
                                                type="number" 
                                                style={{borderLeft : 0}} 
                                                className="form-control" 
                                                placeholder={typeSearchState.text} 
                                                aria-label="Username" 
                                                aria-describedby="addon-wrapping"
                                                onBlur={(e)=>setTextSearch(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <button type="button" class="btn btn-primary" style={{marginTop : 8}} onClick={()=>search()}>ค้นหา</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    {/* {JSON.stringify(orderListState)} */}
                    {orderListState.data.length>0 ?
                    <div style={{marginTop : "2rem"}}>
                        <h5 className="font-weight-bold">กรุณาเลือกคำสั่งซื้อที่ท่านต้องการติดตาม</h5>
                        {/* {JSON.stringify(orderListState)} */}
                        {orderList()}
                    </div>
                    :<>
                        {clickSearchState ?
                        <div style={{marginTop : "50px"}}> 
                            <center>
                                <span style={{fontSize : "4rem"}}>
                                    <i class="fas fa-box-open"></i>
                                </span>
                                <p style={{marginTop:20,fontSize:"1.5rem"}}>ไม่พบคำสั่งซื้อ กรุณาค้นหาใหม่ หรือติดต่อผ่านช่องทางต่างๆของทางร้าน</p>
                            </center> 
                        </div>
                        : <></>}
                    </>}
                </div>
            </div>
        </div>
        <BillboardComp/>
        <br/>
        <br/>
        <RecommendProductComp/>
    </>
}