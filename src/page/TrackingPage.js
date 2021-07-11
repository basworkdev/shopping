import React , {useState , useEffect} from "react";
import { BrowserRouter as Router, useParams ,useHistory } from "react-router-dom";

// Comp
import RecommendProductComp from "../componenst/RecommendProductComp";
import BillboardComp from "../componenst/BillboardComp";

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
    const [orderListState , setOrderListState] = useState([]);


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
        let data = {}
        if(typeSearchState.type === "orderId") {
            data.column = "id";
        }else if (typeSearchState.type === "tel") {
            data.column = "customer_tel";
        }
        data.value = textSearchState;
        let resp = await OrderApi.doserviceSearchOrder(data)
        console.log(resp)
        if(resp.length > 0) {
            if(typeSearchState.type === "orderId") {
                window.location.href = `/order-status/${resp[0].id}`
            }else if(typeSearchState.type === "tel") {
                setOrderListState(resp)
            }
        }
        
    }
    return <>
        <div style={{marginTop : "50px", paddingBottom : "100px"}}>
            <div className="container">
                <h2 className="text-center font-weight-bold" style={{marginTop : "30px"}}>ติดตามสินค้า</h2>
                <p className="text-center text-secondary">สามารถเช็คสถานะสินค้าของท่านได้โดยการกรอก รหัสคำสั่งซื้อ หรือ หมายเลขโทรศัพท์ ได้ที่ช่องด้านล่าง</p>
                    <div className="row" style={{marginTop : 20}}>
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
                                <div className="col-5 col-md-4">
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
                                                <span className="input-group-text" id="addon-wrapping"><i class="fas fa-search"></i></span>
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

                    {orderListState.length>0 ?
                    <div style={{marginTop : "2rem"}}>
                        <h5 className="font-weight-bold">กรุณาเลือกคำสั่งซื้อที่ท่านต้องการติดตาม</h5>
                        {orderListState.map((data)=>{
                            return (
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action">
                                        <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">รหัสคำสั่งซื้อ <span className="font-weight-bold">{data.order_id}</span></h5>
                                        <small>วันที่ <span className="font-weight-bold">{moment(data.order_time).format("DD/MM/YYYY")}</span></small>
                                        </div>
                                        <p class="mb-1">รายการสินค้า</p>
                                        <small>Coleman Skydome Tent: 4-Person 3-Season (4 ชิ้น)</small><br/>
                                        <small>Coleman Skydome Tent: 4-Person 3-Season (4 ชิ้น)</small><br/>
                                        <small>Coleman Skydome Tent: 4-Person 3-Season (4 ชิ้น)</small><br/>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                    :<></>}
            </div>
        </div>
        <BillboardComp/>
        <br/>
        <br/>
        <RecommendProductComp/>
    </>
}