import React , {useState , useEffect} from "react";
import { useHistory } from "react-router-dom";

// CSS
import '../assets/css/login.css'

export default function LoginPage(props) {
    let history = useHistory();
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 pt-5 pb-5">
                    
                    <center><h2 className="font-weight-bold">ลงชื่อเข้าใช้</h2></center>
                    <form style={{marginTop : "1.5rem"}}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">อีเมล์</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">รหัสผ่าน</label>
                            <input type="password" class="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="row">
                            <div className="col-6"></div>
                            <div className="col-6"></div>
                        </div>
                        <p className="text-right text-secondary" style={{cursor : "pointer" , marginBottom : "0rem !important"}}>ลืมรหัสผ่าน</p>
                        <center><button type="submit" class="btn btn-primary" style={{marginTop : "-25px"}}>เข้าสู่ระบบ</button></center>
                    </form>
                    
                    <span class="line">
                        <p>หรือ เข้าสู่ระบบผ่าน</p>
                    </span>
                    <div className="login-icon">
                        <i class="fab fa-google-plus"></i>&nbsp;&nbsp;<i class="fab fa-facebook"></i>
                    </div>
                    <span class="line">
                        <button type="submit" class="btn btn-secondary" onClick={()=>history.push("/register")}>สมัครสมาชิกใหม่</button>
                    </span>
                </div>
                <div className="col-md-3"></div>
            </div>
            <br/><br/>
        </div>
        </>
    )
}