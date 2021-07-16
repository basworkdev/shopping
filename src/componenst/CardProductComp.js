import React , {useState , useEffect} from "react";
import apisMain from "../apis/MainApi"
export default function CardProductComp(props) {
    const [productState , setProductState] = useState(props.product);
    const numeral = require('numeral');
    return (
        <>
        <a href={`/product/${productState.productKey}`} style={{textDecoration: "none" }}>
        <div className="card-product">
            <div className="img-product-card-home">
                <img src={`${process.env.REACT_APP_ENGINE_URL}images/${productState.mainImg}`} className="card-img-top" width="100%" alt="..."/>
                {productState.fullPrice !== productState.price ? 
                    <div className="sell">-{numeral(apisMain.percentSell(productState.fullPrice,productState.price)).format('0')}%</div> 
                : ""}
            </div>
            <div className="card-product-main-detail">
                {productState.salesType === "PREORDER" ? <div className="pre-order-box-product">พรีออเดอร์</div> : <></>}
                <h5 className="card-title">{productState.name}</h5>
                {/* <p className="card-text text-black-50 card-product-detail">{productState.subDetail}</p> */}
                <div className="price-box">
                    <font className="text-secondary">{productState.brandName_th}</font>
                    <table width="100%">
                        <tr>
                            <td width="70%">
                                {/* <a href="#" className="btn btn-primary btn-block">รายละเอียด</a> */}
                                
                                <p className="price font-weight-bold">{numeral(productState.price).format('0,0')}.-</p>
                                {productState.fullPrice !== productState.price ? <p className="discount-product">{numeral(productState.fullPrice).format('0,0')}</p> : <div style={{height:"1rem"}}></div>}
                                
                            </td>
                            <td width="30%" valign="top" className="btn-buy-box">
                                {/* <a href="#" className="btn btn-danger btn-block btn-sm">ซื้อ</a> */}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
            <br/>
            </a>
        </>
    )
}