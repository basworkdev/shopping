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

const apis = {
    doserviceSaveOrder,
    doserviceGetOrderAndOrderDetail
}

export default apis;