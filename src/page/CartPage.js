import React , {useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

// css
import "../assets/css/cart-page.css"

export default function CartPage(props) {
    const inStoreCart = useSelector(state => {
        return state.CsCartRedu.listForCart;
    });

    const setOrderChange = (t) => {
        // let order = orderState;
        // if(t === "+") {
        //     if(order >= productState.stock) {
        //         order = productState.stock;
        //         setStockFullAlertState(true);
        //     } else {
        //         order += 1;
        //         setStockFullAlertState(false);
        //     }
        // } else {
        //     order -= 1;
        //     setStockFullAlertState(false);
        // }
        // if(order <= 0) {
        //     order = 1;
        // }
        
        // setOrderState(order);
    }
    return <>
    <div style={{marginTop : "30px"}}>
    <div className="container">
        <h1>สินค้าในตะกร้าทั้งหมด <span className="font-weight-bold">{inStoreCart.length}</span> รายการ</h1>
        <div className="row" style={{marginTop : "30px"}}>
            <div className="col-md-8">
                <table className="table table-hover">
                    <tr>
                        <th width="1%">ลบ</th>
                        <th width="50%">สินค้า</th>
                        <th className="text-right">ราคา</th>
                        <th className="text-right" width="100px">จำนวน</th>
                        <th className="text-right">รวม</th>
                    </tr>
                    <tr>
                        <td className="text-secondary"><i class="fas fa-trash"></i></td>
                        <td>
                        <div className="row">
                            <div className="col-md-5">
                                <img src="https://www.switchbacktravel.com/sites/default/files/articles%20/Roofnest%20Sparrow%20Eye%20at%20viewpoint%20m.jpg" width="100%"/>
                            </div>
                            <div className="col-md-7 product-detail-cart">
                                <h4 className="font-weight-bold">345455</h4>
                                <p class="text-secondary product-detail-cart-p" style={{marginTop : "-10px"}}>แบรนด์ : ironman</p>
                            </div>
                        </div>
                        </td>
                        <td>
                            <p className="text-secondary text-right discount">33,000</p>
                            <p className="font-weight-bold text-right" style={{marginTop : "-20px"}}>30,000</p>
                        </td>
                        <td className="text-right">
                            <input className="form-control" type="text" defaultValue="5"/>
                        </td>
                        <td className="text-right">60,000</td>
                    </tr>
                    <tr>
                        <td className="text-secondary"><i class="fas fa-trash"></i></td>
                        <td>
                        <div className="row">
                            <div className="col-md-5">
                                <img src="https://www.switchbacktravel.com/sites/default/files/articles%20/Roofnest%20Sparrow%20Eye%20at%20viewpoint%20m.jpg" width="100%"/>
                            </div>
                            <div className="col-md-7">
                                <h4 className="font-weight-bold">345455</h4>
                                <p class="text-secondary" style={{marginTop : "-10px"}}>แบรนด์ : ironman</p>
                            </div>
                        </div>
                        </td>
                        <td><p className="font-weight-bold text-right">30,000</p></td>
                        <td className="text-right">2</td>
                        <td className="text-right">60,000</td>
                    </tr>
                </table>
            </div>
            <div className="col-md-4">
                <div className="setail-sum-cart bg-primary">
                    <h4>สรุปรายการสั่งซื้อ</h4>
                    <div className="row">
                        <div className="col-7 text-white-50">
                            <p>ยอดรวม ( จำนวน 2 ชิ้น )</p>
                        </div>
                        <div className="col-5 text-right">
                            <p>B100,000</p>
                        </div>

                        <div className="col-7 text-white-50">
                            <p>ค่าจัดส่ง</p>
                        </div>
                        <div className="col-5 text-right">
                            B200
                        </div>

                        <div className="col-7 text-white-50">
                            <p>ยอดรวมทั้งหมด</p>
                        </div>
                        <div className="col-5 text-right">
                            B100,200
                        </div>
                    </div>
                    <br/>
                    <button className="btn btn-light btn-block">ยืนยันการสั่งซื้อ</button>
                        
                </div>
            </div>
        </div>
        
        <br/>
        <br/>
    </div>
    </div>
    </>
}