import React ,{useState} from "react";

// CSS
import "../assets/css/catalog.css"

// Comp
import CardProductComp from "../componenst/CardProductComp"

export default function CatalogPage(props) {

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

    const [activeMenuState , setActiveMenuState] = useState(2);

    const setCardProduct = (data) => {
        return data.map((data , index) => {
            return <>
                <div className="col-md-4 col-6">
                    <CardProductComp product={data}/>
                </div>
            </>
        })
    }

    return (
        <>
        <div className="container">
            <div className="header-catalog"></div>
            <div className="row" style={{paddingTop:"40px"}}>
                <div className="col-md-3">
                    <div className="row">
                        <div className="col-md-12 col-6">
                            <div className={`menu-catalog ${activeMenuState === 1 ? "active" : ""}`} onClick={()=>setActiveMenuState(1)}>
                                เต็นท์และเครื่องนอน
                            </div>
                        </div>
                        <div className="col-md-12 col-6">
                            <div className={`menu-catalog ${activeMenuState === 2 ? "active" : ""}`} onClick={()=>setActiveMenuState(2)}>
                                เต็นท์หลังคารถ
                            </div>
                        </div>
                        <div className="col-md-12 col-6">
                            <div className={`menu-catalog ${activeMenuState === 3 ? "active" : ""}`} onClick={()=>setActiveMenuState(3)}>
                                อุปกรณ์แคมป์ปิ้ง
                            </div>
                        </div>
                        <div className="col-md-12 col-6">
                            <div className={`menu-catalog ${activeMenuState === 4 ? "active" : ""}`} onClick={()=>setActiveMenuState(4)}>
                                เต็นท์หลังคารถ
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
                <div className="col-md-9">
                    <div className="line-product-title">
                        <h4>เต็นท์หลังคารถ</h4>
                        <p className="p-product-title text-secondary">เต็นท์สำหรับรถยนต์ ไม่ว่าจะรถเล็กหรือรถใหญ่ก็สามารถติดตั้งได้</p>
                    </div>
                    <br/>
                    <div className="row">
                        {setCardProduct(rooftopTentState)}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}