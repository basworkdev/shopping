import React , {useState , useEffect} from "react";
import { BrowserRouter as Router, useParams ,useHistory } from "react-router-dom";

// API
import proApis from "../apis/ProductsApi";

// Comp
import CardProductComp from "../componenst/CardProductComp"

export default function RecommendProductComp(props) {
    const [productState , setProductState ] = useState([]);
    useEffect(()=>{
        getProductAllByType()
    },[])

    const getProductAllByType = async () => {
        let productList = await proApis.doserviceGetProductByType("all");
        console.log(productList);
        setProductState(productList);
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
    
    return <>
        <div className="container">
            {productState.length > 0 ?
            <>
            <div className="line-product-title">
            <h4>{productState[0].typeName}</h4>
            <p className="p-product-title text-secondary">{productState[0].typeDetail}</p>
            </div>
            <br/>
            <div className="row">
                {setCardProduct(productState)}
            </div>
            </>
            : 
            <div className="container text-center" style={{paddingTop : "70px" , paddingBottom : "70px" , fontSize : "2rem"}}>
                ไม่พบสินค้า
            </div>
            }
        </div>
    </>
}