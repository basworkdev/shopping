import axios from "axios";

const doserviceSaveOrder = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_ENGINE_URL}saveOrder` , data , {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res => {
            resolve(res.data);
        }).catch(reason => {
            reject(reason);
        })
    });
}

const doserviceGetOrderAndOrderDetail = (orderId) => {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_ENGINE_URL}getOrderAndOrderDetail/${orderId}` , {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res => {
            resolve(res.data);
        }).catch(reason => {
            reject(reason);
        })
    });
}

const doserviceUpdateSlip = (data) => {
    let dataUpdate = {
        orderId : data.orderId,
        pay_status : data.pay_status,
        pay_date : data.pay_date,
        status : data.status,
        pay_image : data.pay_image
    }
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_ENGINE_URL}updateSlip` , dataUpdate, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(res => {
            resolve(res.data);
        }).catch(reason => {
            reject(reason);
        })
    });
}

const apis = {
    doserviceSaveOrder,
    doserviceGetOrderAndOrderDetail,
    doserviceUpdateSlip
}

export default apis;