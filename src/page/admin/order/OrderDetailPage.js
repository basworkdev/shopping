import React ,{useState,useEffect} from "react";
import DataTable from 'react-data-table-component';
import ProductsApi from '../../../apis/ProductsApi'
import { useHistory , useParams } from "react-router-dom";
import tc from '../../../config/text.json'

// Apis
import OrderApi from '../../../apis/OrderApi'

// Comp
import DeliveryAddressComp from "../../../componenst/DeliveryAddressComp";


export default function OrderDetailPage(props) {
    const {orderId} = useParams();
    let moment = require('moment');
    let numeral = require('numeral');
    const [orderState,setOrderState] = useState({});
    const [orderDetailState,setOrderDetailState] = useState([]);

    useEffect(()=>{
        getOrder();
    },[])

    const getOrder = async () => {
        let orderData = await OrderApi.doserviceGetOrderById(orderId);
        let orderDetailData = await OrderApi.doserviceGetOrderAndOrderDetail(orderId);
        console.log("orderData" , orderData);
        console.log("orderDetailData" , orderDetailData);
        setOrderState(orderData[0]);
        setOrderDetailState(orderDetailData);

    }

    const columns = [
    {
        name: 'รูป',
        selector: '',
        sortable: true,
    },
    {
        name: 'รหัสสินค้า',
        selector: 'productKey',
        sortable: true,
        width : "250px"
    },
    {
        name: 'ชื่อ',
        selector: 'name',
        sortable: true,
        width : "250px"
    },
    {
        name: 'แบรนด์',
        selector: 'brandName_th',
        sortable: true,
    },
    {
        name: 'สี',
        selector: 'color',
        sortable: true,
        cell: (data) => {
            return <div class="pro-color-page-mini active" style={{backgroundColor : data.color}}></div>
        }
    },
    {
        name: 'ราคาเต็ม',
        selector: 'fullPrice',
        sortable: true,
        cell: (data) => {
            let value = "-"
            if(data) {
              value = numeral(data.fullPrice).format('0,0')
            }
            return value;
        }
    },
    {
        name: 'ราคา',
        selector: 'price',
        sortable: true,
        cell: (data) => {
            let value = "-"
            if(data) {
              value = numeral(data.price).format('0,0')
            }
            return value;
        }

    },
    {
        name: 'ค่าส่ง',
        selector: 'deliveryCost',
        sortable: true,
        cell: (data) => {
            let value = "-"
            if(data) {
              value = numeral(data.deliveryCost).format('0,0')
            }
            return value;
        }
    },
    {
        name: 'จำนวน',
        selector: 'order_amount',
        sortable: true,
        cell: (data) => {
            let value = "-"
            if(data) {
              value = numeral(data.order_amount).format('0,0')
            }
            return value;
        }
    }
    ];

    const setNumber = (data) => {
        let value = 0
        if(data) {
            value = numeral(data).format('0,0')
        }
        return value;
    }

    const showProduct = (e) => {
        window.open( `/product/${e.productKey}`, '_blank');
    }

    return(
        <>
            <div className="container admin-page">
                <h2>รายละเอียดการสั่งซื้อ รายการ <span className="font-weight-bold">{orderId}</span></h2>
                <div className="row" style={{marginTop : "20px"}}>
                    <div className="col-md-6">
                        <div className="box-main">
                            <h5 className="font-weight-bold"><span><i class="fas fa-money-bill-wave-alt"></i></span> สรุปยอดสั่งซื้อ</h5>
                            <div className="row">
                                <div className="col-7">
                                    <p>ยอดรวม ( จำนวน {setNumber(orderState.amount)} ชิ้น )</p>
                                </div>
                                <div className="col-5 text-right">
                                    <p>{setNumber(orderState.sum_full_price)} บ.</p>
                                </div>
                                <div className="col-7">
                                    <p>ส่วนลด</p>
                                </div>
                                <div className="col-5 text-right">
                                    <p>{setNumber(orderState.sum_discount)} บ.</p>
                                </div>
                                <div className="col-7">
                                    <p>รวม</p>
                                </div>
                                <div className="col-5 text-right">
                                    <p>{setNumber(orderState.sum_price)} บ.</p>
                                </div>

                                <div className="col-7">
                                    <p>ค่าจัดส่ง</p>
                                </div>
                                <div className="col-5 text-right">
                                    <p>{setNumber(orderState.sum_shipping_cost)} บ.</p>
                                </div>

                                <div className="col-7">
                                    <p>ยอดรวมทั้งหมด</p>
                                </div>
                                <div className="col-5 text-right">
                                    <p className="font-weight-bold">{setNumber(orderState.total)} บ.</p>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                    <div className="col-md-6">
                        <div className="box-main">
                            <h5 className="font-weight-bold"><span><i class="fas fa-truck"></i></span> ที่อยู่ในการจัดส่ง</h5>
                            <p>{orderState.customer_name}</p>
                            <p>{orderState.customer_tel}</p>
                            <p>{orderState.customer_address} ,
                            ต. {orderState.customer_district} &nbsp; 
                            อ. {orderState.customer_amphure} &nbsp;
                            จ. {orderState.customer_province} &nbsp;
                            {orderState.customer_postcode}
                            <hr/>
                            email : {orderState.customer_email}
                            </p>
                        </div>
                        <br/>
                    </div>
                </div>
                <p>รายสารสินค้าที่สั่งซื้อ <span className="font-weight-bold">{setNumber(orderState.amount)}</span> ชิ้น</p>
                <div>
                <DataTable
                    noHeader
                    columns={columns}
                    data={orderDetailState}
                    pagination
                    persistTableHead
                    style={{backgroundColor : "none"}}
                    onRowClicked={(e)=>showProduct(e)}
                />
                </div>
            </div>
        </>
    )
}