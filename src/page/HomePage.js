import React ,{useState} from "react";
import { useHistory } from "react-router-dom";

// Comp
import SlideComp from '../componenst/SlideComp'
import CardProductComp from '../componenst/CardProductComp'

// CSS
import '../assets/css/home-page.css'
export default function HomePage(props) {
    let history = useHistory();
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

    const [tentState , setTentState] = useState(
        [
            {
                name : "Eureka Copper",
                subDetail : "Canyon LX Tent: 3-Season 8 Person",
                sell : 10,
                price : 33000,
                originalPrice : 35000,
                image1 : "../image/T1.jpg"
            },
            {
                name : "Kelty Tallboy 6 Tent",
                subDetail : "6 Person 3 Season",
                sell : "",
                price : 30000,
                originalPrice : "",
                image1 : "../image/T2.jpg"
            },
            {
                name : "ALPS Mountaineering Camp Creek 4 Tent",
                subDetail : "4-Person 3-Season",
                sell : "",
                price : 33000,
                originalPrice : "",
                image1 : "../image/T3.jpg"
            },
            {
                name : "Big Agnes Insulated Tent Comforter",
                subDetail : "Big Agnes Insulated Tent Comforter",
                sell : 20,
                price : 40000,
                originalPrice : 45000,
                image1 : "../image/T4.jpg"
            }
        ]
    )

    const [campingState , setCampingState] = useState(
        [
            {
                name : "YETI",
                subDetail : "YETI Roadie 24 Cooler",
                sell : 10,
                price : 33000,
                originalPrice : 35000,
                image1 : "../image/C1.jpg"
            },
            {
                name : "MSR Reactor 1.7L Stove System",
                subDetail : "MSR Reactor 1.7L Stove System",
                sell : "",
                price : 30000,
                originalPrice : "",
                image1 : "../image/C2.jpg"
            },
            {
                name : "Dometic CFX3 45 Powered Cooler",
                subDetail : "Dometic CFX3 45 Powered Cooler",
                sell : "",
                price : 33000,
                originalPrice : "",
                image1 : "../image/C3.jpg"
            },
            {
                name : "Camp Chef Explorer 2 Burner Range",
                subDetail : "Camp Chef Explorer 2 Burner Range",
                sell : 20,
                price : 40000,
                originalPrice : 45000,
                image1 : "../image/C4.jpg"
            }
        ]
    )

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
            <div class="slide-container">
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
                                <h4 class="card-title" style={{marginTop:"20px"}}>เต็นท์ Thule 2</h4>
                                <p class="card-text text-black-50 card-product-detail">
                                    A rugged rooftop tent for exploring off-road campsites
                                    600D ripstop blend fabric is durable and protects from weather
                                    Removable annex offers privacy and gear storage
                                    High-density foam mattress adds comfort and an at-home feel
                                </p>
                            <p style={{textDecoration: "line-through"}} className="text-secondary">35,000</p>
                            <p style={{fontSize : "2rem",marginTop:"-20px"}} className="font-weight-bold">30,000</p>
                            <div style={{width:"100%",marginTop:"-60px"}} className="text-right">
                                <a href="/product" class="btn btn-danger" style={{width:"100px"}}>รายละเอียด</a>
                            </div>
                            </div>
                            
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {setCardProduct(rooftopTentState)}
                </div>
                <div className="text-right other-btn">
                    <a href="/catalog" type="button" class="btn btn-primary">เพิ่มเติม</a>
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
                    <a href="/catalog" type="button" class="btn btn-primary">เพิ่มเติม</a>
                </div>
            </div>
            <br/>
            <div className="container">
                <div className="line-product-title">
                    <h4>อุปกรณ์แคมป์ปิ้ง</h4>
                    <p className="p-product-title text-secondary">เต็นท์สำหรับรถยนต์ ไม่ว่าจะรถเล็กหรือรถใหญ่ก็สามารถติดตั้งได้</p>
                </div>
                <div className="row">
                    {setCardProduct(campingState)}
                </div>
                <div className="text-right other-btn">
                    <a href="/catalog" type="button" class="btn btn-primary">เพิ่มเติม</a>
                </div>
            </div>
            <br/>
            <br/>
        </>
    )
}