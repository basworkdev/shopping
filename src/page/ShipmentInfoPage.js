import React , {useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CartAct } from "../actions/CartAct";
import bootbox from 'bootbox';
import tc from '../config/text.json'
import { useForm } from "react-hook-form";

// css
import "../assets/css/cart-page.css"

// API
import proApis from "../apis/ProductsApi";
import addressApi from "../apis/AddressApi";
import OrderApi from "../apis/OrderApi";
import MainApi from "../apis/MainApi"

// Comp
import CardProductComp from "../componenst/CardProductComp"
import OrderSummaryComp from "../componenst/OrderSummaryComp"
import SpinnerComp from "../componenst/SpinnerComp"


export default function ShipmentInfoPage(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const tcv = tc.validate;
    let history = useHistory();
    const dispatch = useDispatch();
    let moment = require('moment');
    const [spinnerState,setSpinnerState] = useState(false);
    const [provincesState , setProvincesState] = useState([]);
    const [amphuresState , setAmphuresState] = useState([]);
    const [districtsState , setDistrictsState] = useState([]);
    const [nameProvincesState , setNameProvincesState] = useState([]);
    const [nameAmphuresState , setNameAmphuresState] = useState([]);
    const [nameDistrictsState , setNameDistrictsState] = useState([]);
    const [addressState , setAddressState] = useState({})

    let inStoreCart = useSelector(state => {
        return state.CsCartRedu;
    });
    

    useEffect(()=>{
        let address = JSON.parse(localStorage.getItem("customerAddress"))
        debugger
        if(address) {
            setAddressState(address);
            if(address.province) {
                getAmphures(parseInt(address.province))
                setNameProvincesState(address.provinceName)
            }
            if(address.amphure) {
                getDistricts(parseInt(address.amphure));
                setNameAmphuresState(address.amphureName)
            }
            if(address.district) {
                setNameDistrictsState(address.districtName)
            }
        }
        getProvinces();

    },[])

    const getProvinces = async () => {
        setSpinnerState(true)
        // const provinces = await addressApi.doserviceGetProvinces();
        const provinces = MainApi.getProvinces()
        setProvincesState(provinces);
        setSpinnerState(false)
    }

    const getAmphures = async (province_id) => {
        let amphures = []
        if(!province_id) {
            province_id = 0
        }
        setSpinnerState(true)
        // amphures = await addressApi.doserviceGetAmphures(province_id);
        amphures = await MainApi.getAmphure(province_id)
        setAmphuresState(amphures);
        setDistrictsState([]);
        setSpinnerState(false)
        // setAddressState({
        //     ...addressState,
        //     postcode : ""
        // })
    }

    const getDistricts = async (amphure_id) => {
        let districts = []
        if(!amphure_id) {
            amphure_id = 0
        }
        setSpinnerState(true)
        // districts = await addressApi.doserviceGetDistricts(amphure_id);
        districts = await MainApi.getDistricts(parseInt(amphure_id))
        setDistrictsState(districts);
        setSpinnerState(false)
        // setAddressState({
        //     ...addressState,
        //     postcode : ""
        // })
    }

    const getPostCode = async (districts_id) => {
        let postCode = await MainApi.getPostCode(parseInt(districts_id));
        setAddressState({
            ...addressState,
            postcode : postCode
        })
    }

    const onSubmit = async (data) => {
        debugger
        console.log(data);
        // ------------------------------ //
        let orderSummary = inStoreCart.OrderSummary;
        // let customer = JSON.parse(localStorage.getItem("customerAddress"));
        let id = moment().format("YYMMDDHHmmss").toString() + (Math.floor(Math.random()*(999-100+1)+100)).toString();
        console.log("id " , id)
        
        let dataOrder = {
            id : id,
            amount : orderSummary.sumNumOrder,
            sum_full_price : orderSummary.sumFullPrice,
            sum_discount : orderSummary.sumDiscount,
            sum_price : orderSummary.sumPrice,
            sum_shipping_cost : orderSummary.sumDeliveryCost,
            total : orderSummary.sumAllPrice,
            customer_name : data.name,
            customer_tel : data.tel,
            customer_email : data.email,
            customer_address : data.address,
            customer_province : nameProvincesState,
            customer_amphure : nameAmphuresState,
            customer_district : nameDistrictsState,
            customer_postcode : data.postcode,
            order_time : new Date(),
            pay_status : "NOT",
            status : "ORDER",
            delivery_number : "",
            delivery_company : "",
            user_id : "",
            orderDetail : inStoreCart.listForCart
        }
        const resp = await OrderApi.doserviceSaveOrder(dataOrder);
        console.log(resp)
        if(resp.code === 1) {
            localStorage.removeItem("listForCart");
            let payload = inStoreCart;
            payload.OrderSummary = {};
            payload.listForCart = [];
            dispatch({ type: CartAct.LOAD_DATA, payload });
        }

        // ------------------------------ //

        data.provinceName = nameProvincesState;
        data.amphureName = nameAmphuresState;
        data.districtName = nameDistrictsState;
        localStorage.setItem("customerAddress" , JSON.stringify(data))
        window.location = `/payment/${id}`;
        
    };


    return <>
    <SpinnerComp spinner={spinnerState}/>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div style={{marginTop : "30px"}}>
    <div className="container">
        <h1>ข้อมูลการจัดส่ง</h1>
        <div className="row" style={{marginTop : "30px"}}>
            <div className="col-md-8">
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <div class="form-group">
                            <label>ชื่อ-สกุล</label>
                            <input 
                                name="name"
                                type="text" 
                                class="form-control" 
                                placeholder="ชื่อ-สกุล"
                                ref={register({ required: true })}
                                defaultValue={addressState.name}
                            />
                            {errors.name && <small class="form-text text-danger">{tcv.requestFiles}</small>}
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>หมายเลขโทรศัพ</label>
                            <input 
                                name="tel"
                                type="number" 
                                class="form-control" 
                                placeholder="หมายเลขโทรศัพที่สามารถติดต่อได้"
                                min="0"
                                ref={register({ required: true })}
                                defaultValue={addressState.tel}
                            />
                            {errors.tel && <small class="form-text text-danger">{tcv.requestFiles}</small>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>อีเมล</label>
                            <input 
                                name="email"
                                type="email" 
                                class="form-control" 
                                placeholder="email"
                                min="0"
                                ref={register({ 
                                    required: tcv.requestFiles,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: tcv.emailFormat
                                    }
                                 })}
                                defaultValue={addressState.email}
                            />
                            {errors.email && <small class="form-text text-danger">{errors.email.message}</small>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div class="form-group">
                            <label>ที่อยู่</label>
                            <textarea 
                                name="address"
                                row="5" 
                                class="form-control" 
                                placeholder="กรุณาระบุที่อยู่ (บ้านเลขที่ , ถนน , ตำบล)"
                                ref={register({ required: true })}
                                defaultValue={addressState.address}
                            ></textarea>
                            {errors.address && <small class="form-text text-danger">{tcv.requestFiles}</small>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>จังหวัด</label>
                            <select 
                                name="province"
                                class="form-control"
                                ref={register({ required: true })}
                                onChange={(e)=>{
                                    getAmphures(e.target.value);
                                    setNameProvincesState(e.target.options[e.target.selectedIndex].innerHTML);
                                }}
                            >
                                <option value="">กรุณาเลือกจังหวัด</option>
                                {provincesState.map((data)=>{
                                    return <option value={data.id} selected={data.id===parseInt(addressState.province)}>{data.name_th}</option>
                                })}
                            </select>
                            {errors.province && <small class="form-text text-danger">{tcv.requestFiles}</small>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>เขต/อำเภอ</label>
                            <select 
                                name="amphure"
                                class="form-control"
                                ref={register({ required: true })}
                                disabled={amphuresState.length===0}
                                onChange={(e)=>{
                                    getDistricts(e.target.value);
                                    setNameAmphuresState(e.target.options[e.target.selectedIndex].innerHTML);
                                }}
                            >
                                <option value="">กรุณาเลือกอำเภอ</option>
                                {amphuresState.map((data)=>{
                                    return <option value={data.id} selected={data.id===parseInt(addressState.amphure)}>{data.name_th}</option>
                                })}
                            </select>
                            {errors.amphure && <small class="form-text text-danger">{tcv.requestFiles}</small>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>แขวง/ตำบล</label>
                            <select 
                                name="district"
                                class="form-control"
                                ref={register({ required: true })}
                                disabled={districtsState.length===0}
                                onChange={(e)=>{
                                    setNameDistrictsState(e.target.options[e.target.selectedIndex].innerHTML);
                                    getPostCode(e.target.value);
                                }}
                            >
                                <option value="">กรุณาเลือกตำบล</option>
                                {districtsState.map((data)=>{
                                    return <option value={data.id} selected={data.id===parseInt(addressState.district)}>{data.name_th}</option>
                                })}
                            </select>
                            {errors.district && <small class="form-text text-danger">{tcv.requestFiles}</small>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div class="form-group">
                            <label>รหัสไปรษณีย์</label>
                            <input 
                                name="postcode"
                                type="text" 
                                class="form-control" 
                                placeholder="รหัสไปรษณีย์"
                                ref={register({ required: true })}
                                defaultValue={addressState.postcode}
                                value={addressState.postcode}
                                onChange={(e)=>{
                                    setAddressState({
                                        ...addressState,
                                        postcode : e.target.value
                                    })
                                }}
                            />
                            {errors.postcode && <small class="form-text text-danger">{tcv.requestFiles}</small>}
                        </div>
                    </div>
                </div>
            </form>
            <br/>
            
            </div>
            <div className="col-md-4">
                <OrderSummaryComp btnText="ชำระเงิน" type="submit"/>
                <br/>
            </div>
        </div>
    </div>
    </div>
    </form>
    </>
}