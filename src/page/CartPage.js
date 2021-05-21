import React , {useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartAct } from "../actions/CartAct";
import bootbox from 'bootbox';

// css
import "../assets/css/cart-page.css"

export default function CartPage(props) {
    const numeral = require('numeral');
    const dispatch = useDispatch();
    let inStoreCart = useSelector(state => {
        return state.CsCartRedu.listForCart;
    });
    let _ = require('lodash');

    const [sumOrderState , setSumOrderState] = useState({})

    useEffect(()=>{
        sumOrderFunction()
    },[inStoreCart])

    const sumOrderFunction = () => {
        let sumPrice = 0;
        let sumFullPrice = 0;
        let sumDeliveryCost = 0;
        let sumNumOrder = 0;
        let sumDiscount  = 0;
        let sumAllPrice = 0;
        for (let i=0 ; i<inStoreCart.length ; i++) {
            let data = inStoreCart[i];
            sumFullPrice += (data.fullPrice*data.order)
            sumPrice += (data.price*data.order)
            sumDeliveryCost += (data.deliveryCost*data.order)
            sumNumOrder += data.order
            sumDiscount += (data.fullPrice-data.price)*data.order
            
        }
        debugger
        sumDiscount = sumFullPrice-sumPrice;
        sumAllPrice = sumPrice+sumDeliveryCost;
        
        let sumOrder = {
            sumPrice : sumPrice,
            sumFullPrice : sumFullPrice,
            sumNumOrder : sumNumOrder,
            sumDeliveryCost : sumDeliveryCost,
            sumDiscount : sumDiscount,
            sumAllPrice : sumAllPrice
        }
        setSumOrderState(sumOrder);
    }

    const removeProduct = (product) => {
        
        bootbox.confirm({
            message: `<p class="text-danger">ยืนยันการลบสินค้า <span><b>${product.name}</b></span></p>`,
            buttons: {
                confirm: {
                    label: 'ยืนยัน',
                    className: 'btn-danger'
                },
                cancel: {
                    label: 'ยกเลิก',
                    className: 'btn-secondary'
                }
            },
            callback: function (result) {
                if(result) {
                    let listCart = []
                    inStoreCart.map((data)=>{
                        if(data.id !== product.id) {
                            listCart.push(data)
                        }
                    })
                    let payload = {
                        listForCart : []
                    };
                    payload.listForCart = listCart
                    localStorage.setItem("listForCart" , JSON.stringify(payload.listForCart))
                    dispatch({ type: CartAct.LOAD_DATA, payload });
                }
            }
        });
    }


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
                <table className="table table-hover" hidden={inStoreCart.length===0}>
                    <tr>
                        <th width="1%">ลบ</th>
                        <th width="50%">สินค้า</th>
                        <th className="text-right">ราคา</th>
                        <th className="text-right" width="100px">จำนวน</th>
                        <th className="text-right">รวม</th>
                    </tr>

                    {inStoreCart.map((data)=>{
                        return <>
                            <tr>
                                <td className="text-secondary align-middle"><div className="pointer" onClick={()=>removeProduct(data)}><i className="fas fa-trash"></i></div></td>
                                <td>
                                <div className="row">
                                    <div className="col-md-5">
                                        <a href={`/product/${data.productKey}`} style={{textDecoration: "none" }}> <img src={`${process.env.REACT_APP_ENGINE_URL}images/${data.mainImg}`} width="100%"/> </a>
                                    </div>
                                    <div className="col-md-7 product-detail-cart">
                                    <a href={`/product/${data.productKey}`} style={{textDecoration: "none" }}> <h4 className="font-weight-bold">{data.name}</h4> </a>
                                        <p className="text-secondary product-detail-cart-p" style={{marginTop : "-10px"}}>แบรนด์ : {data.brandName_th}</p>
                                    </div>
                                </div>
                                </td>
                                <td>
                                    <p className="text-secondary text-right discount" hidden={data.fullPrice === data.price}>{numeral(data.fullPrice).format('0,0')}</p>
                                    <p className="font-weight-bold text-right" style={{marginTop : data.fullPrice === data.price ? "0px" : "-20px"}}>{numeral(data.price).format('0,0')}</p>
                                </td>
                                <td className="text-right">
                                    <input className="form-control" type="number" defaultValue={data.order}/>
                                </td>
                                <td className="text-right">{numeral(data.price * data.order).format('0,0')}</td>
                            </tr>
                        </>
                    })}
                </table>
            </div>
            <div className="col-md-4">
                <div className="setail-sum-cart bg-primary">
                    <h4>สรุปรายการสั่งซื้อ</h4>
                    <div className="row">
                        <div className="col-7 text-white-50">
                            <p>ยอดรวม ( จำนวน {sumOrderState.sumNumOrder} ชิ้น )</p>
                        </div>
                        <div className="col-5 text-right">
                            <p>{numeral(sumOrderState.sumFullPrice).format('0,0')} บ.</p>
                        </div>
                        <div className="col-7 text-white-50">
                            <p>ส่วนลด</p>
                        </div>
                        <div className="col-5 text-right">
                            <p>{numeral(sumOrderState.sumDiscount).format('0,0')} บ.</p>
                        </div>
                        <div className="col-7 text-white-50">
                            <p>รวม</p>
                        </div>
                        <div className="col-5 text-right">
                            <p>{numeral(sumOrderState.sumPrice).format('0,0')} บ.</p>
                        </div>

                        <div className="col-7 text-white-50">
                            <p>ค่าจัดส่ง</p>
                        </div>
                        <div className="col-5 text-right">
                            <p>{numeral(sumOrderState.sumDeliveryCost).format('0,0')} บ.</p>
                        </div>

                        <div className="col-7 text-white-50">
                            <p>ยอดรวมทั้งหมด</p>
                        </div>
                        <div className="col-5 text-right">
                            <p>{numeral(sumOrderState.sumAllPrice).format('0,0')} บ.</p>
                        </div>
                    </div>
                    <br/>
                    <button className="btn btn-danger btn-block">ยืนยันการสั่งซื้อ</button>
                        
                </div>
            </div>
        </div>
        
        <br/>
        <br/>
    </div>
    </div>
    </>
}