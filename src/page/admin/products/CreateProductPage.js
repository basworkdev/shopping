import React ,{useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import ProductsApi from '../../../apis/ProductsApi'
import Select from 'react-select';
import tc from '../../../config/text.json'

// Comp
import UploadImageComp from '../../../componenst/admin/UploadImageComp'

export default function CreateProductPage(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [dataBrandState , setDataBrandState] = useState([]);
  const [dataProductTypeState , setDataProductTypeState] = useState([]);
  const [dataColorState , setDataColorState] = useState([]);
  const [selectColorState , setSelectColorState] = useState([]);
  const [imagesUploadState , setImagesUploadState] = useState([]);
  const [typeState , setTypeState] = useState("");
  const [brandState , setBrandState] = useState("");

  const tcv = tc.validate.requestFiles;
  let _ = require('lodash');
  
  useEffect(() => {
    getBrand();
    getProductType();
    getProductColor();
  }, []);
  
  const getBrand = async () => {
    let brandList = await ProductsApi.doserviceGetBrand();
    let brand = brandList.map((data,index)=>{
        return { value: data.id, label: data.name };
    })
    setDataBrandState(brand);
  }
  const getProductType = async () => {
    let typeList = await ProductsApi.doserviceGetProductType();
    let type = typeList.map((data,index)=>{
        return { value: data.id, label: data.name_th };
    })
    setDataProductTypeState(type);
  }
  const getProductColor = async () => {
    let colorData = await ProductsApi.doserviceGetConfig("PRODUCT_COLOR");
    colorData = (colorData[0].value).split(",")
    let color = colorData.map((data,index)=>{
        return data
    })
    setDataColorState(color);
  }

  const selectColor = (data) => {
    setSelectColorState([...selectColorState,data]);
  }
  const removeColor = (data) => {
    let color = selectColorState;
    let evens = _.remove(color, function(n) {
        return n !== data;
    });
    setSelectColorState([...evens]);
  }

  const clickUpload = (e) => {
    setImagesUploadState([...imagesUploadState , `${process.env.REACT_APP_ENGINE_URL+"images/"+e.filename}`]);
  }

  const removeUpload = (data) => {
    let image = imagesUploadState;
    let evens = _.remove(image, function(n) {
        return n !== data;
    });
    setImagesUploadState([...evens]);
  }

  const selectType = (e) => {
    setTypeState(e.value)
  }

  const selectBrand = (e) => {
      setBrandState(e.value)
  }

  const onSubmit = async (data) => {
    data.status = data.status === true ? data.status = "Y" : data.status = "N";
    console.log(data);
    const create = await ProductsApi.doserviceCreateProduct(data);
    if(create.code === 1) {
        alert(create.message);
    } else {
        alert("เกิดข้อผิดพลาด");
    }
    
  }

  return(
      <>
          <div className="container admin-page">
              <h2>เพิ่มสินค้า</h2>
              <br/>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>คีย์สินค้า</label>
                            <input type="text" className="form-control" name="productKey" ref={register({ required: true })}/>
                            {errors.productKey && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>ชื่อสินค้า</label>
                            <input type="text" className="form-control" name="name" ref={register({ required: true })}/>
                            {errors.name && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>รายละเอียดหลัก</label>
                            <input type="text" className="form-control" name="mainDetail" ref={register({ required: false })}/>
                            {errors.mainDetail && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>รายละเอียด</label>
                            <textarea rows="3" className="form-control" name="detail" ref={register({ required: false })}></textarea>
                            {errors.detail && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>รายละเอียดเพิ่มเติม</label>
                            <textarea rows="3" className="form-control" name="subDetail" ref={register({ required: false })}></textarea>
                            {errors.subDetail && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>ราคา</label>
                            <input type="text" className="form-control" name="price" ref={register({ required: true })}/>
                            {errors.price && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>ราคาเต็ม</label>
                            <input type="text" className="form-control" name="fullPrice" ref={register({ required: true })}/>
                            {errors.fullPrice && <span className="text-danger">{tcv}</span>}
                        </div>
                        
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>แบรนด์</label>
                            <Select 
                                options={dataBrandState} 
                                onChange={(e)=>selectBrand(e)}
                            />
                            <input type="hidden" className="form-control" name="brand" value={brandState} ref={register({ required: true })}/>
                            {errors.brand && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>ประเภท</label>
                            <Select 
                                options={dataProductTypeState} 
                                onChange={(e)=>selectType(e)}
                            />
                            <input type="hidden" className="form-control" name="type" value={typeState.toString()} ref={register({ required: false })}/>
                            {errors.type && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>สี</label>
                            <div style={{border : "1px solid #aaa" ,padding : "10px 30px 10px 30px"}}>
                                <div className="row">
                                    {selectColorState.map((data,index)=>{
                                        return <div 
                                            className="col-1" 
                                            style={{marginRight : "10px", width:"100%" , height : "30px" , backgroundColor : `${data}` , cursor : "pointer"}}
                                            onClick={()=>removeColor(data)}
                                        ></div>
                                    })}
                                </div>
                            </div>
                            <br/>
                            <p>เลือกสี</p>
                            <div style={{paddingLeft : "10px"}}>
                                <div className="row">
                                    {dataColorState.map((data,index)=>{
                                        return <div 
                                            className="col-1" 
                                            style={{marginRight : "10px", width:"100%" , height : "30px" , backgroundColor : data , cursor : "pointer"}}
                                            onClick={()=>selectColor(data)}
                                        ></div>
                                    })}
                                </div>
                                <input type="hidden" name="color" value={selectColorState.toString()} ref={register({ required: true })}/>
                            </div>
                            {errors.color && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>อัพโหลดรูปภาพ</label>
                            <div style={{border : "1px solid #aaa" ,padding : "10px 30px 10px 30px"}}>
                                <div className="row">
                                    {imagesUploadState.map((data,index)=>{
                                        return <div 
                                            className="col-3" 
                                            style={{marginRight : "10px", cursor : "pointer"}}
                                            onClick={()=>removeUpload(data)}
                                        >
                                            <img src={data} width="100%"/>
                                        </div>
                                    })}
                                </div>
                            </div>
                            <br/>
                            <UploadImageComp onClickUpload={(e)=>clickUpload(e)} />
                            <br/>
                            <input type="hidden" name="img" value={imagesUploadState.toString()} ref={register({ required: true })}/>
                            {errors.img && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>สต๊อก</label>
                            <input type="number" name="stock" className="form-control" defaultValue="0" ref={register({ required: true })}/>
                            {errors.stock && <span className="text-danger">{tcv}</span>}
                        </div>
                        <div className="form-group">
                            <label>สถานะ</label>
                            <br/>
                            <label class="switch">
                                <input type="checkbox" name="status" ref={register({ required: false })}/>
                                {errors.status && <span className="text-danger">{tcv}</span>}
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <br/>
                <center><button className="btn btn-primary" type="submit">บันทึก</button></center>
              </form>
          </div>
      </>
  )
}