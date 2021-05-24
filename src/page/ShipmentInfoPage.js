import React , {useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartAct } from "../actions/CartAct";
import bootbox from 'bootbox';
import tc from '../config/text.json'

// css
import "../assets/css/cart-page.css"

// API
import proApis from "../apis/ProductsApi";

// Comp
import CardProductComp from "../componenst/CardProductComp"
import OrderSummaryComp from "../componenst/OrderSummaryComp"

export default function CartPage(props) {

    return <>
    <div style={{marginTop : "30px"}}>
    <div className="container">
        <h1>ข้อมูลการจัดส่ง</h1>
        <div className="row" style={{marginTop : "30px"}}>
            <div className="col-md-8">
            <form>
                <div className="row">
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>ชื่อ-สกุล</label>
                            <input type="text" class="form-control" placeholder="ชื่อ-สกุล"/>
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>หมายเลขโทรศัพ</label>
                            <input type="text" class="form-control" placeholder="หมายเลขโทรศัพที่สามารถติดต่อได้"/>
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div class="form-group">
                            <label>ที่อยู่</label>
                            <textarea row="5" class="form-control" placeholder="กรุณาระบุที่อยู่ (บ้านเลขที่ , ถนน , ตำบล)"></textarea>
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>จังหวัด</label>
                            <select class="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>เขต/อำเภอ</label>
                            <select class="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>แขวง/ตำบล</label>
                            <select class="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>รหัสไปรษณีย์</label>
                            <input type="text" class="form-control" placeholder="รหัสไปรษณีย์"/>
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                    </div>
                </div>
            </form>
            <br/>
            
            </div>
            <div className="col-md-4">
                <OrderSummaryComp btnText="ชำระเงิน" link="/shipment-info"/>
                <br/>
            </div>
        </div>
    </div>
    </div>
    </>
}