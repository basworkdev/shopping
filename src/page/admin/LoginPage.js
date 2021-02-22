import React ,{useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import conTxt from "../../config/text.json";
import LoginApi from "../../apis/admin/LoginApi"

export default function LoginPage(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    let history = useHistory();

    useEffect(()=>{
        sessionStorage.clear();
    },[])

    
    const onSubmit = async (data) => {
        let loginData = {
            userName : data.userName,
            password : data.password
        }
        const login = await LoginApi.doserviceLogin(loginData);
        if(login.code === 1) {
            sessionStorage.setItem("user" , JSON.stringify({
                userName : loginData.userName,
                name : login.name
            }));
            window.location.replace("/admin/dashboard");
        }else {
            alert(login.message);
        }
    }
    
    return(
        <>
        <div className="container" style={{paddingTop : "100px",paddingBottom : "100px"}}>
            <h1 className="text-center font-weight-bold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-group">
                    <label>User</label>
                    <input type="text" name="userName" ref={register({ required: true })} class="form-control"/>
                    {errors.userName && <small class="form-text text-danger">{conTxt.validate.requestFiles}</small>}
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" ref={register({ required: true })} class="form-control"/>
                    {errors.password && <small class="form-text text-danger">{conTxt.validate.requestFiles}</small>}
                </div>
                <center><button type="submit" class="btn btn-primary">login</button></center>
            </form>
        </div>
        </>
    )
}