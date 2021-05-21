import React , {useState , useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import tc from '../config/text.json'
import bootbox from 'bootbox';

// CSS
import '../assets/css/login.css'

export default function LoginPage(props) {
    let history = useHistory();
    let numeral = require('numeral');
    let moment = require('moment');
    const { register, handleSubmit, watch, errors } = useForm();
    const tcv = tc.validate.requestFiles;

    
    const onSubmit = (data) => {
        bootbox.alert(JSON.stringify(data));
        console.log(data);
    }

    console.log(watch("example")); // watch input value by passing the name of it

    const [dateSelectState , setDateSelectState] = useState([]);
    const [yearSelectState , setYearSelectState] = useState([]);

    useEffect(()=>{
        setYearOption();
    },[])
    
    const changeMonth = (e) => {
        let m = e.target.value;
        let d = 0;
        if(m === "01" || m === "03" || m === "05" || m === "07" || m === "08" || m === "10" || m === "12") {
            d = 31;
        } else if(m === "04" || m === "06" || m === "09" || m === "11") {
            d = 30;
        } else if(m === "02") {
            d = 29;
        }else {
            d = 0;
        }
        let date = [];
        for(let i=1;i<=d;i++) {
            date.push(numeral(i).format('00'))
        }
        setDateSelectState(date)
    }
    const setYearOption = () => {
        const date = new Date();
        const year = parseInt(moment(date).format('YYYY'));
        const yearList = [];
        for(let i=year-100;i<=year;i++) {
            yearList.push(numeral(i).format('00'))
        }
        setYearSelectState(yearList);
    }
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 pt-5 pb-5">
                    
                    <center><h2 className="font-weight-bold">สมัครสมาชิกใหม่</h2></center>
                    <form style={{marginTop : "1.5rem"}} onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>ชื่อ - สกุล</label>
                            <input type="text" name="fullName" className="form-control" ref={register({ required: true })}/>
                            {errors.fullName && <small className="form-text text-danger">{tcv}</small>}
                        </div>
                        <div className="form-group">
                            <label>เบอร์โทรศัพท์</label>
                            <input type="text" name="tel" className="form-control" ref={register({ required: true })}/>
                            {errors.tel && <small className="form-text text-danger">{tcv}</small>}
                        </div>
                        <div className="form-group">
                            <label>เพศ</label>
                            <select className="form-control" name="sex" ref={register({ required: true })}>
                                <option value=""></option>
                                <option value="m">ชาย</option>
                                <option value="f">หญิง</option>
                            </select>
                            {errors.sex && <small className="form-text text-danger">{tcv}</small>}
                        </div>
                        <label>วันเกิด</label>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-6">
                                    <select className="form-control" name="month" onChange={(e) => changeMonth(e)} ref={register({ required: true })}>
                                        <option value="">เดือน</option>
                                        <option value="01">มกราคม</option>
                                        <option value="02">กุมภาพันธ์</option>
                                        <option value="03">มีนาคม</option>
                                        <option value="04">เมษายน</option>
                                        <option value="05">พฤษภาคม</option>
                                        <option value="06">มิถุนายน</option>
                                        <option value="07">กรกฎาคม</option>
                                        <option value="08">สิงหาคม</option>
                                        <option value="09">กันยายน</option>
                                        <option value="10">ตุลาคม</option>
                                        <option value="11">พฤศจิกายน</option>
                                        <option value="12">ธันวาคม</option>
                                    </select>
                                    {errors.month && <small className="form-text text-danger">{tcv}</small>}
                                </div>
                                <div className="col-3">
                                    <select className="form-control" name="day" ref={register({ required: true })} disabled={dateSelectState.length===0}>
                                        <option value="">วันที่</option>
                                        {dateSelectState.map((data)=>{
                                            return <option value={data}>{data}</option>
                                        })}
                                    </select>
                                    {errors.day && <small className="form-text text-danger">{tcv}</small>}
                                </div>
                                <div className="col-3">
                                    <select className="form-control" name="year" ref={register({ required: true })}>
                                        <option>ปี</option>
                                        {yearSelectState.map((data)=>{
                                            return <option value={data}>{data}</option>
                                        })}
                                    </select>
                                    {errors.year && <small className="form-text text-danger">{tcv}</small>}
                                </div>
                            </div>
                        </div>
                        <span className="line">
                            <p>ข้อมูลในการเข้าระบบ</p>
                        </span>
                        <div className="form-group" style={{marginTop:"2rem"}}>
                            <label>อีเมล์</label>
                            <input type="email" className="form-control" name="email" ref={register({ required: true })}/>
                            {errors.email && <small className="form-text text-danger">{tcv}</small>}
                        </div>
                        <div className="form-group">
                            <label>รหัสผ่าน</label>
                            <input type="password" className="form-control" name="password" ref={register({ required: true })}/>
                            {errors.password && <small className="form-text text-danger">{tcv}</small>}
                        </div>
                        <div className="form-group">
                            <label>ยืนยันรหัสผ่าน</label>
                            <input type="password" className="form-control" name="confirmPassword" ref={register({ required: true })}/>
                            {errors.confirmPassword && <small className="form-text text-danger">{tcv}</small>}
                        </div>

                        <center><button type="submit" className="btn btn-primary" style={{marginTop : "20px"}}>สมัครสมาชิก</button></center>
                    </form>
                    
                </div>
                <div className="col-md-3"></div>
            </div>
            <br/><br/>
        </div>
        </>
    )
}