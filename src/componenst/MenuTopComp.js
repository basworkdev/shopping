import React , {useState , useEffect} from "react";
import { useHistory } from "react-router-dom";

// Comp
import SearchComp from './SearchComp'

// Apis
import proApis from '../apis/ProductsApi'
export default function MenuTopComp(props) {
    let history = useHistory();
    const [productTypeState , setProductTypeState] = useState([]);

    useEffect(()=>{
        getProductTypeFunction()
    },[])

    const getProductTypeFunction = async () => {
        let proType = await proApis.doserviceGetProductType();
        console.log(proType);
        // proType.unshift({
        //  detail: "สินค้าทั้งหมด",
        //  id: "all",
        //  mane_en: "all product",
        //  name_th: "สินค้าทั้งหมด",
        //  type_order: 0
        // })
        setProductTypeState(proType);
     }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary text-left" style={{width:"100%"}}>
            <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <SearchComp/>
            <a className="navbar-brand logo-menu" style={{cursor : "pointer"}} href="/home"><img src="../image/logo2.png" width="80px"/></a>
            
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <a className="nav-link" href="/home">หน้าหลัก <span className="sr-only">(current)</span></a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdownProduct" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    สินค้า
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownProduct">
                    <a class="dropdown-item" href="/catalog/all">สินค้าทั้งหมด</a>
                    <div class="dropdown-divider"></div>
                    {productTypeState.map((data ,index)=>{
                        return (
                            <a class="dropdown-item" href={`/catalog/${data.id}`} key={index}>{data.name_th}</a>
                        )
                    })}
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/contact-us">ติดต่อเรา</a>
                </li>
                </ul>
                <div className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-3" type="search" placeholder="ค้นหาสินค้า" aria-label="Search" style={{borderRadius : "1.1rem"}}/>
                    <button className="btn btn-outline-secondary my-2 my-sm-0 btn-sm" type="submit"><i className="fas fa-search"></i></button>
                </div>
            </div>
            </div>
            </nav>
        </>
    )
}