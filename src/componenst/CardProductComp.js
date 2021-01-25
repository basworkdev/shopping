import React , {useState , useEffect} from "react";
export default function CardProductComp(props) {
    const [productState , setProductState] = useState(props.product);
    const numeral = require('numeral');
    return (
        <>
        <div className="card-product">
            <div className="img-product-card-home">
                <img src={productState.image1} class="card-img-top" width="100%" alt="..."/>
                {productState.sell ? <div className="sell">-{productState.sell}%</div> : ""}
            </div>
            <div className="card-product-main-detail">
                <h5 class="card-title">{productState.name}</h5>
                <p class="card-text text-black-50 card-product-detail">{productState.subDetail}</p>
                <div className="price-box">
                    <table width="100%">
                        <tr>
                            <td width="70%">
                                {/* <a href="#" class="btn btn-primary btn-block">รายละเอียด</a> */}
                                
                                <p className="price font-weight-bold">{numeral(productState.price).format('0,0')}.-</p>
                                {productState.originalPrice ? <p className="discount">{numeral(productState.originalPrice).format('0,0')}</p> : <div style={{height:"1rem"}}></div>}
                                
                            </td>
                            <td width="30%" valign="top" className="btn-buy-box">
                                {/* <a href="#" class="btn btn-danger btn-block btn-sm">ซื้อ</a> */}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
            <br/>
        </>
    )
}