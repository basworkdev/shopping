import React , {useState , useEffect} from "react";

// CSS
import "../assets/css/product-page.css"

// Comp
import CardProductComp from "../componenst/CardProductComp"
export default function ProductPage(props) {
    const [productState,setProductStae] = useState(
        {
            key : "rooftop-tent-01",
            image : ["../image/TC2-1.jpg","../image/TC2-2.jpg","../image/TC2-3.jpg","../image/TC2-4.jpg","../image/TC2-5.jpg","../image/TC2-6.jpg"],
            name : "Thule x Tepui 1 เต็นท์หลังคารถ",
            subDetail : "เต็นท์หลังคารถสำหรับ 2 คน",
            mainDetail : "เต็นท์หลังคารถ Thule x Tepui 1 ติดตั้ง และใช้งานง่าย สะดวก ปลอดภัย พร้อมไปกับคุณทุกที่ กันน้ำ กันฝน 100% ผ้า cotton 100% ซิป YKK น็อต สแตนแลส โครงสร้าง อลูมิเนียม Water proof coating, Rot-proof coating,UV protection, PU coating อายุการใช่งานยาวนาน ไม่มีค่าบำรุงรักษา หมดปัญหาเรื่องสัตว์ร้าย น้ำท่วม พื้นไม่เรียบ พื้นเปียก และอื่นๆ",
            detail : "xxxxxxxxxxxxxxxxxxx",
            pirce : "33000",
            fullPirec : "35000",
            discount : "10%",
            color : ["#ff0000" , "#dddddd" , "#000000"],

        }
    )
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

    const [productImageState , setProductState] = useState(productState.image[0]);
    const [colorActiveState , setColorActiveState] = useState(productState.color[0])


    const clickViewImage = (img) => {
        setProductState(img);
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
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="pro-img-page">
                            <div className="pro-container-discount-persen-page">
                                <img src={productImageState} width="100%"/>
                                <div className="pro-discount-persen-page">
                                    <p className="pro-box-discount-persen-page shadow font-weight-bold">
                                        -{productState.discount}
                                    </p>
                                </div>
                            </div>
                            <div className="row" >
                                {productState.image.map((data,index)=>{
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
                            <p>{productState.mainDetail}</p>
                            <button type="button" class="btn btn-outline-primary btn-sm">ข้อมูลเพิ่มเติม</button>
                            <p className="pro-price-page font-weight-bold">{productState.pirce}.-</p>
                            {productState.fullPirec !== productState.pirce ? <p className="pro-discount-page">{productState.fullPirec}</p> : ""}
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
                                            <span class="input-number-decrement">–</span><input class="input-number" type="text" value="1" min="0" max="10"/><span class="input-number-increment">+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <button style={{marginTop:"30px"}} type="button" class="btn btn-primary btn-lg btn-block">
                                            <i class="fas fa-shopping-basket"></i> เพิ่มในตะกร้า
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button style={{marginTop:"30px"}} type="button" class="btn btn-danger btn-lg btn-block shadow">ซื้อ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                    <button type="button" class="btn btn-primary">เพิ่มเติม</button>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
        </>
    )
}