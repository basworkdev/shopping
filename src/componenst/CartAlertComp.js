import React , {useState , useEffect} from "react";
import { Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function CartAlertComp(props) {
    const numeral = require('numeral');
    let history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(()=>{
        setShow(props.status);
    },[props.status])

    return <>
        <Modal show={show} onHide={()=>{handleClose();props.getStatus(false)}}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize:"1.2rem"}}><b><span className="text-success"><i class="fas fa-check"></i></span> สินค้าจำนวน 1 รายการได้ถูกเพิ่มลงในรถเข็นของท่าน</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.data ? 
            <div className="row">
                <div className="col-4">
                    <img src={`${process.env.REACT_APP_ENGINE_URL}images/${props.data.mainImg}`} width="100%"/>
                </div>
                <div className="col-8">
                    <h4 className="font-weight-bold">{props.data.name}</h4>
                    <table>
                        <tr>
                            <td>สี : </td>
                            <td style={{paddingLeft : "7px"}}><div class="pro-color-page-mini active" style={{backgroundColor: `${props.data.color}`}}></div></td>
                        </tr>
                        <tr>
                            <td style={{paddingTop:"7px"}}>จำนวน : </td>
                            <td style={{paddingTop:"7px",paddingLeft : "7px"}}><b>{props.data.order} ชิ้น</b></td>
                        </tr>
                    </table>
                    <p style={{marginTop:"7px"}}>ราคาต่อชิ้น : </p>
                    <p className="pro-price-page font-weight-bold" style={{marginTop:"-15px"}}>{numeral(props.data.price).format('0,0')}.-</p>
                    {numeral(props.data.fullPrice).format('0,0') !== numeral(props.data.price).format('0,0') ? <p className="pro-discount-page">{numeral(props.data.fullPrice).format('0,0')}</p> : ""}
                </div>
            </div>
            : "" }
            <div style={{padding : "15px 0 0px 0" , borderTop : "1px solid #dee2e6"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-6" style={{paddingBottom:"15px"}}>
                            <button type="button" className="btn btn-secondary btn-block" data-dismiss="modal" onClick={()=>{handleClose();props.getStatus(false)}}>เลือกดูสินค้าเพิ่ม</button>
                        </div>
                        <div className="col-md-6 col-6">
                            <button type="button" className="btn btn-primary btn-block" onClick={()=>window.location='/cart'}>ไปยังรถเข็น</button>
                        </div>
                    </div>
                </div>
            </div>

        </Modal.Body>
      </Modal>
    </>
}