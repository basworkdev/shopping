import React ,{useState} from "react";
import { useForm } from "react-hook-form";
import conTxt from "../../config/text.json"

export default function LoginPage(props) {
    const { register, handleSubmit, watch, errors } = useForm();
    
    const onSubmit = (data) => {
        let login = {
            
        }
        console.log(data);
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