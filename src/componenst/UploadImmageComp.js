import React ,{useState,useEffect} from "react";
import axios from "axios";
import MainApi from "../apis/MainApi"

// CSS
import "../assets/css/paymnet-page.css"


export default function UploadImageComp(props) {
    const [file, setFile] = useState({}) // ## ใช้เพื่อส่งไปที่ API
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null) // ##ใช้เพื่อภาพ Preview
    const [imageResState , setImageResState] = useState({});

    const handleUploadImage = (e) => { 
        const file = e.target.files[0] // ## เก็บไว้ setState ลงใน file
        const reader = new FileReader(); // ## เรียก Class FileReader เพื่อแปลง file image ที่รับเข้ามา
        reader.onloadend = () => { // ## เป็น eventของFileReaderเมื่อโหลดภาพเสร็จ
            setFile(file) // ## ทำการ setState
            setImagePreviewUrl(reader.result) // ##เหมือนด้านบน
            props.uploadImage(reader.result)
        }
        reader.readAsDataURL(file) // ## เป็นส่วนของการแสดงรูป ไม่ค่อยแน่ใจครับ ผู้รู้ช่วยคอมเม้นบอกด้วยนะครับ
    }

    const onClickUpload = async () => {
        const formData = new FormData() // #สร้างตัวแปร มารับ Class FormData
        formData.append('file', file) // #arg แรกนั้นเป็น ชื่อ Key ส่วน arg2 เป็น Value
        // let uploadImage = await MainApi.doserviceUploadImage(formData);
        // setImageResState(uploadImage);
        // console.log(uploadImage)
        // props.onClickUpload(uploadImage); 
        console.log(formData)
        props.upload(formData)
    }
        
   
    return (
        <>
            <div className="box-payment">
                <div>
                    <div style={{marginBottom : "-110px"}}>
                        <div style={{paddingTop:30}}>
                            {props.detailShow ?
                            <p className="text-secondary text-center">
                                ยังไม่มีเอกสาร
                            </p>
                             :
                            <div style={{paddingTop:20}}></div>}
                            
                            <center><button type="button" class="btn btn-danger btn-lg">อัพโหลดหลักฐานการชำระเงิน (คลิก)</button></center>
                        </div>
                    </div>
                    <input 
                        type="file"
                        className="file-upload" 
                        style={{marginTop : "-100px"}}
                        onChange={handleUploadImage}
                        onBlur={(e)=>{onClickUpload();}}
                    />
                    
                </div>   
            </div>
             
        </>
    )
}