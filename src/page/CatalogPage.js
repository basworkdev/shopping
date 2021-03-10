import React , {useState , useEffect} from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import proApis from "../apis/ProductsApi";
// CSS
import "../assets/css/catalog.css"
// Comp
import CardProductComp from "../componenst/CardProductComp"
import SpinnerComp from "../componenst/SpinnerComp"


export default function CatalogPage(props) {
    const {type} = useParams();
    const [spinnerState,setSpinnerState] = useState(false);
    const [productTypeState , setProductTypeState] = useState([]);
    const [productState , setProductState ] = useState([]);


    useEffect(() => {
        getProductTypeFunction();
        getProductAllByType();
    }, [])

    const getProductTypeFunction = async () => {
       setSpinnerState(true)
       let proType = await proApis.doserviceGetProductType();
       setSpinnerState(false)
       console.log(proType);
       proType.unshift({
        detail: "สินค้าทั้งหมด",
        id: "all",
        mane_en: "all product",
        name_th: "สินค้าทั้งหมด",
        type_order: 0
       })
       setProductTypeState(proType);
    }
    const getProductAllByType = async () => {
        setSpinnerState(true)
        let productList = await proApis.doserviceGetProductAllByType(type);
        setSpinnerState(false)
        console.log(productList);
        setProductState(productList);
        
    }

    const setCardProduct = (data) => {
        return data.map((data , index) => {
            return <>
                <div className="col-md-4 col-6">
                    <CardProductComp product={data}/>
                </div>
            </>
        })
    }

    const selectProductType = (type) => {
        window.location.href = `/catalog/${type.toLowerCase()}`
        // history.push(`/catalog/${type}`)
    }

    return (
        <>
        <SpinnerComp spinner={spinnerState}/>
        <div className="container">
            <div className="header-catalog"></div>
            <div className="row" style={{paddingTop:"40px"}}>
                <div className="col-md-3">
                    <div className="row">
                        {productTypeState ? productTypeState.map((data,index)=>{
                            return <>
                            <div className="col-md-12 col-6">
                                <div 
                                    className={`menu-catalog ${data.id.toUpperCase() === type.toUpperCase() ? "active" : ""}`}
                                    onClick={()=>selectProductType(data.id)}    
                                >
                                    {data.name_th}
                                </div>
                            </div>
                            </>
                        }) : 
                        ""
                        }
                    </div>
                    <br/>
                </div>
                <div className="col-md-9">
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
            </div>
            <br/>
            <br/>
        </div>
        </>
    )
}