import React , {useState , useEffect} from "react";
import { useHistory } from "react-router-dom";

// Comp
import SlideComp from '../componenst/SlideComp'
import CardProductComp from '../componenst/CardProductComp'
import SpinnerComp from "../componenst/SpinnerComp"

// API
import apis from "../apis/ProductsApi";

// CSS
import '../assets/css/home-page.css'

export default function HomePage(props) {
    let history = useHistory();
    const [spinnerState,setSpinnerState] = useState(false);
    const [rooftopTentState , setRooftopTentState ] = useState([])
    const [tentState , setTentState] = useState([])
    const [assistiveDeviceState , setAssistiveDeviceState] = useState([])


    useEffect(async () => {
        setSpinnerState(true)
        let roofTopTent = await getProductByType("ROOF_TOP_TENT");
        let tent = await getProductByType("TENT");
        let assistiveDevice = await getProductByType("ASSISTIVE-DEVICE");

        setRooftopTentState(roofTopTent);
        setTentState(tent);
        setAssistiveDeviceState(assistiveDevice);
        setSpinnerState(false)
    }, [])

    const getProductByType = async (typeId) => {
        let productByType = await apis.doserviceGetProductByType(typeId);
        return productByType;
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

    return(
        <>
            <SpinnerComp spinner={spinnerState}/>
            <div className="slide-container">
                <SlideComp className=""/>
                <div className="slide-top-left">
                    <img src="../image/slide-top2.png" width="100%"/>
                </div>
                <div className="slide-bottom-left">
                    <img src="../image/slide-bottom.png" width="100%"/>
                </div>
            </div>

            <div className="logo-brand">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-3 text-center">
                            <img src="../image/patagonia.png" width="50%"/>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <img src="../image/the-north-face.png" width="50%"/>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <img src="../image/marmot.png" width="50%"/>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                            <img src="../image/arc-teryx.png" width="50%"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-rooftop">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div style={{paddingRight : "30px"}}>
                                <br/>
                                <img src="../image/CT01.png" width="100%"/>
                            </div>
                            <br/>
                        </div>
                        <div className="col-md-6 card-promotion1" >
                            <h3>สินค้าแนะนำ</h3>
                            <div className="card-promotion shadow-sm">
                                <div className="a-promotion1">
                                    <div className="b-promotion1">
                                    <div className="triangle-topright"></div>
                                    <p className="triangle-topright-number font-weight-bold">-20%</p>
                                    </div>
                                </div>
                                <h4 className="card-title" style={{marginTop:"20px"}}>เต็นท์ Thule 2</h4>
                                <p className="card-text text-black-50 card-product-detail">
                                    A rugged rooftop tent for exploring off-road campsites
                                    600D ripstop blend fabric is durable and protects from weather
                                    Removable annex offers privacy and gear storage
                                    High-density foam mattress adds comfort and an at-home feel
                                </p>
                            <p style={{textDecoration: "line-through"}} className="text-secondary">35,000</p>
                            <p style={{fontSize : "2rem",marginTop:"-20px"}} className="font-weight-bold">30,000</p>
                            <div style={{width:"100%",marginTop:"-60px"}} className="text-right">
                                <a href="/product" className="btn btn-primary" style={{width:"100px"}}>รายละเอียด</a>
                            </div>
                            </div>
                            
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row mt-5">
                    {setCardProduct(rooftopTentState)}
                </div>
                <div className="text-right other-btn">
                    <a href="/catalog/roof_top_tent" type="button" className="btn btn-primary">เพิ่มเติม</a>
                </div>
                <br/>
            </div>
            <div className="bg-camping1">
            </div>
            <br/>
            <br/>
            <div className="container">
                <div className="line-product-title">
                    <h4>เต็นท์และเครื่องนอน</h4>
                    <p className="p-product-title text-secondary">เต็นท์สำหรับรถยนต์ ไม่ว่าจะรถเล็กหรือรถใหญ่ก็สามารถติดตั้งได้</p>
                </div>
                <br/>
                <div className="row">
                    {setCardProduct(tentState)}
                </div>
                <div className="text-right other-btn">
                    <a href="/catalog/tent" type="button" className="btn btn-primary">เพิ่มเติม</a>
                </div>
            </div>
            <br/>
            <div className="container">
                <div className="line-product-title">
                    <h4>อุปกรณ์แคมป์ปิ้ง</h4>
                    <p className="p-product-title text-secondary">เต็นท์สำหรับรถยนต์ ไม่ว่าจะรถเล็กหรือรถใหญ่ก็สามารถติดตั้งได้</p>
                </div>
                <br/>
                <div className="row">
                    {setCardProduct(assistiveDeviceState)}
                </div>
                <div className="text-right other-btn">
                    <a href="/catalog/assistive-device" type="button" className="btn btn-primary">เพิ่มเติม</a>
                </div>
            </div>
            <br/>
            <br/>
        </>
    )
}