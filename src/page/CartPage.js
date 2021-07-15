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
import RecommendProductComp from "../componenst/RecommendProductComp";
import BillboardComp from "../componenst/BillboardComp";

export default function CartPage(props) {
    const numeral = require('numeral');
    const dispatch = useDispatch();
    const tcv = tc.validate;
    let inStoreCart = useSelector(state => {
        return state.CsCartRedu;
    });
    let _ = require('lodash');

    const [sumOrderState , setSumOrderState] = useState({})
    const [stockFullAlertState , setStockFullAlertState] = useState(false);

    useEffect(()=>{
        sumOrderFunction()
    },[inStoreCart.listForCart])

    const sumOrderFunction = () => {
        let sumPrice = 0;
        let sumFullPrice = 0;
        let sumDeliveryCost = 0;
        let sumNumOrder = 0;
        let sumDiscount  = 0;
        let sumAllPrice = 0;
        for (let i=0 ; i<inStoreCart.listForCart.length ; i++) {
            let data = inStoreCart.listForCart[i];
            sumFullPrice += (data.fullPrice*data.order)
            sumPrice += (data.price*data.order)
            sumDeliveryCost += (data.deliveryCost*data.order)
            sumNumOrder += data.order
            sumDiscount += (data.fullPrice-data.price)*data.order
            
        }
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
            message: `<p>ยืนยันการลบสินค้า <span><b>${product.name}</b></span></p>`,
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
                    inStoreCart.listForCart.map((data)=>{
                        if(data.id !== product.id) {
                            listCart.push(data)
                        }
                    })
                    let payload = {
                        listForCart : []
                    };
                    payload.listForCart = listCart
                    let x = inStoreCart.update ? inStoreCart.update : 0
                    x++;
                    payload.update = x
                    console.log(payload.update)
                    localStorage.setItem("listForCart" , JSON.stringify(payload.listForCart))
                    dispatch({ type: CartAct.LOAD_DATA, payload });
                }
            }
        });
    }

    const setCardProduct = (data) => {
        return data.map((data , index) => {
            return <>
                <div className="col-md-3 col-6">
                    <CardProductComp product={data}/>
                </div>
            </>
        })
    }

    const checkNullValue = (order,id) => {
        if(parseInt(order)<1 || !parseInt(order)) {
            document.getElementById(`numOrder${id}`).value = 1;
        }
    }

    const checkStock = (order,stock,id) => {
        try {
            if(parseInt(order) > stock) {
                // setStockFullAlertState(true)
                document.getElementById(`order${id}`).innerHTML = `${tcv.maxStock} ${stock} ชิ้น`
                document.getElementById(`numOrder${id}`).value = stock;
            } else {
                document.getElementById(`order${id}`).innerHTML = ""
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const editOrder = (order,id) => {
        try {
            let payload = {};
            let newList = inStoreCart.listForCart;
            for(let i=0 ; i<newList.length ; i++) {
                if(newList[i].id === parseInt(id)) {
                    newList[i].order = parseInt(order);
                }
            }
            payload.listForCart = newList
            let x = inStoreCart.update ? inStoreCart.update : 0
            x++;
            payload.update = x
            console.log(payload.update)
            localStorage.setItem("listForCart" , JSON.stringify(payload.listForCart))
            dispatch({ type: CartAct.LOAD_DATA, payload });

        } catch (error) {
            console.log(error)
        }
    }

    return <>
    <div style={{marginTop : "60px"}}>
    <div className="container">
        <div className="row" style={{marginTop : "30px"}}>
            <div className="col-md-8">
            <h1 style={{marginBottom : "30px"}}>สินค้าในรถเข็นทั้งหมด <span className="font-weight-bold">{inStoreCart.listForCart.length}</span> รายการ</h1>
                    {inStoreCart.listForCart.map((data,index)=>{
                        return <>
                            <div className="row">
                                <div className="col-md-1 col-12 text-right"><div className="pointer text-secondary" onClick={()=>removeProduct(data)}><i className="fas fa-trash"></i></div></div>
                                <div className="col-md-7 col-11">
                                    <div className="row">
                                        <div className="col-3">
                                            <a href={`/product/${data.productKey}`} style={{textDecoration: "none" }}> <img src={`${process.env.REACT_APP_ENGINE_URL}images/${data.mainImg}`} width="100%"/> </a>
                                        </div>
                                        <div className="col-9 product-detail-cart">
                                            <a href={`/product/${data.productKey}`} style={{textDecoration: "none" }}> <h5 className="font-weight-bold">{data.name}</h5> </a>
                                            <div className="text-secondary product-detail-cart-p" style={{marginTop : "-10px"}}>แบรนด์ : {data.brandName_th}</div>
                                            <div class="pro-color-page-mini active" style={{backgroundColor: `${data.color}`}}></div>
                                            {/* <div className="text-secondary product-detail-cart-p">สี : <div class="pro-color-page-mini active" style={{backgroundColor: `${data.color}`}}></div></div> */}
                                        
                                            <div>
                                                <p className="text-secondary discount" hidden={data.fullPrice === data.price}>{numeral(data.fullPrice).format('0,0')}</p>
                                                <p className="font-weight-bold" style={{marginTop : data.fullPrice === data.price ? "0px" : "-10px"}}>{numeral(data.price).format('0,0')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-md-4 col-12">
                                    <div className="row">
                                        <div className="col-5 text-right">
                                            จำนวน
                                        </div>
                                        <div className="col-6">
                                            <div className="text-right">
                                                <input 
                                                    className="form-control" 
                                                    id={`numOrder${index}`} 
                                                    type="number" 
                                                    defaultValue={data.order} 
                                                    onChange={(e)=>{checkStock(e.target.value,data.stock,`${index}`);editOrder(e.target.value,`${data.id}`)}}
                                                    onBlur={(e)=>checkNullValue(e.target.value,`${index}`)}
                                                />
                                            </div>
                                            <span className="text-danger" id={`order${index}`}></span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-2 col-12 text-right">{numeral(data.price * data.order).format('0,0')}</div> */}
                            </div>
                            <div className="line" style={{padding : "20px 0px 0px 0px" , marginBottom : "20px"}}></div>
                        </>
                    })}  
                    <br/>
            </div>
            <div className="col-md-4">
                <OrderSummaryComp btnText="ยืนยันการสั่งซื้อ" link="/shipment-info"/>
                <br/>
            </div>
        </div>
        <br/>
    </div>
    </div>
    <BillboardComp/>
    <br/>
    <br/>
    <RecommendProductComp/>
    </>
}