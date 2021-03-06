import React , {useState , useEffect} from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import apis from "../apis/ProductsApi";
import apisMain from "../apis/MainApi"
// CSS
import "../assets/css/product-page.css"

// Comp
import CardProductComp from "../componenst/CardProductComp"
export default function ProductPage(props) {
    const {key} = useParams();
    const numeral = require('numeral');
    const [productState,setProductStae] = useState();
    const [rooftopTentState , setRooftopTentState ] = useState(
        [
            {
                name : "เต็นท์ Thule 2",
                subDetail : "เต็นท์หลังคารถสำหรับ 2 คน",
                sell : 10,
                price : 33000,
                originalPrice : 35000,
                image1 : "../image/TC1.jpg"
            },
            {
                name : "เต็นท์ Thule 2",
                subDetail : "เต็นท์หลังคารถสำหรับ 2 คน",
                sell : "",
                price : 30000,
                originalPrice : "",
                image1 : "../image/TC3.jpg"
            },
            {
                name : "เต็นท์ Thule 3",
                subDetail : "เต็นท์หลังคารถสำหรับ 3 คน",
                sell : "",
                price : 33000,
                originalPrice : "",
                image1 : "../image/TC1.jpg"
            },
            {
                name : "เต็นท์ Thule 4",
                subDetail : "เต็นท์หลังคารถสำหรับ 4 คน",
                sell : 20,
                price : 40000,
                originalPrice : 45000,
                image1 : "../image/TC3.jpg"
            },
            {
                name : "Thule Awning",
                subDetail : "Thule Awning",
                sell : 20,
                price : 40000,
                originalPrice : 45000,
                image1 : "../image/AN1.jpg"
            },
            {
                name : "Rhino-Rack Batwing Awning",
                subDetail : "Rhino-Rack Batwing Awning",
                sell : "",
                price : 40000,
                originalPrice : "",
                image1 : "../image/AN2.jpg"
            },
            {
                name : "Rhino-Rack Sunseeker Side Wall",
                subDetail : "เต็นท์หลังคารถสำหรับ 4 คน",
                sell : 20,
                price : 40000,
                originalPrice : 45000,
                image1 : "../image/AN3.jpg"
            },
            {
                name : "Thule Mosquito Net Walls for 6ft Awning",
                subDetail : "เต็นท์หลังคารถสำหรับ 4 คน",
                sell : 20,
                price : 40000,
                originalPrice : 45000,
                image1 : "../image/AN4.jpg"
            }
        ]
    )

    const [productImageState , setProductImageState] = useState();
    const [colorActiveState , setColorActiveState] = useState()

    useEffect(()=>{
        getProductByKey();
    },[])

    const getProductByKey = async () => {
        let product = await apis.doserviceGetProductByKey(key);
        if(product.length > 0){
            product = product[0];
            product.img = product.img.split(",");
            product.color = product.color.split(",");
            setColorActiveState(product.color[0])
            setProductImageState(product.img[0]);
            console.log(product);
            setProductStae(product);
        }
    }

    const clickViewImage = (img) => {
        setProductImageState(img);
    } 
    const colorActive = (color) => {
        setColorActiveState(color);
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

    
    return (
        <>
        {productState ? 
        <div className="container">
        <div className="row">
            <div className="col-md-6">
                <div className="pro-img-page">
                    <div className="pro-container-discount-persen-page">
                        <img src={productImageState} width="100%"/>
                        <div className="pro-discount-persen-page">
                            <p className="pro-box-discount-persen-page shadow font-weight-bold">
                                -{ numeral(apisMain.percentSell(productState.fullPrice,productState.price)).format('0')}%
                            </p>
                        </div>
                    </div>
                    <div className="row" style={{marginTop : "30px"}}>
                        {productState.img.map((data,index)=>{
                            return <>
                                <div className="col-2 col-md-2">
                                    <div 
                                        className={`pro-sum-img-page ${data === productImageState ? "active" : ""}`}
                                        onClick={()=>{clickViewImage(data)}}
                                    >
                                        <img src={data} width="100%"/>
                                    </div>
                                </div>
                            </>
                        })}
                    </div>
                </div>
                
            </div>
            <div className="col-md-6">
                <div className="pro-product-page">
                    <h1 className="pro-name-page font-weight-bold">{productState.name}</h1>
                    <p>{productState.subDetail}</p>
                    <h5 style={{paddingTop : "0.5rem"}} className="font-weight-bold">รายละเอียด</h5>
                    <p>{productState.detail}</p>
                    <button type="button" className="btn btn-outline-primary btn-sm">ข้อมูลเพิ่มเติม</button>
                    <p className="pro-price-page font-weight-bold">{numeral(productState.price).format('0,0')}.-</p>
                    {productState.fullPriec !== productState.price ? <p className="pro-discount-page">{numeral(productState.fullPrice).format('0,0')}</p> : ""}
                    <h5 style={{paddingTop : "0.3rem"}} className="font-weight-bold">สี</h5>
                    <div className="pro-color-box-page">
                        <div className="row">
                            {productState.color.map((data,index)=>{
                                return <div className="col-1 col-md-1">
                                    <div 
                                        className={`pro-color-page ${colorActiveState === data ? "active" : ""}`} 
                                        style={{backgroundColor:`${data}` , cursor : "pointer"}}
                                        onClick={()=>colorActive(data)}
                                    >
                                    </div>
                                </div>
                            })}
                            
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <h5 style={{paddingTop : "1.2rem"}} className="font-weight-bold">จำนวน</h5>
                                <div>
                                    <span className="input-number-decrement">–</span><input className="input-number" type="text" value="1" min="0" max="10"/><span className="input-number-increment">+</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <button style={{marginTop:"30px"}} type="button" className="btn btn-primary btn-lg btn-block">
                                    <i className="fas fa-shopping-basket"></i> เพิ่มในตะกร้า
                                </button>
                            </div>
                            <div className="col-6">
                                <button style={{marginTop:"30px"}} type="button" className="btn btn-danger btn-lg btn-block shadow">ซื้อ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    : 
    <div className="container text-center" style={{paddingTop : "70px" , paddingBottom : "70px" , fontSize : "2rem"}}>
        ไม่พบสินค้า
    </div>
    }
        <hr/>
    <br/>
    <div className="container">
        <div className="line-product-title">
            <h4>เต็นท์หลังคารถ</h4>
            <p className="p-product-title text-secondary">เต็นท์สำหรับรถยนต์ ไม่ว่าจะรถเล็กหรือรถใหญ่ก็สามารถติดตั้งได้</p>
        </div>
        <br/>
        <div className="row">
            {setCardProduct(rooftopTentState)}
        </div>
        <div className="text-right other-btn">
            <a href="/catalog" type="button" className="btn btn-primary">เพิ่มเติม</a>
        </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
        </>
    )
}