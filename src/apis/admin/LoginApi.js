import axios from "axios";

const doserviceGetProduct = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_ENGINE_URL}mProduct?token=${token}`,{
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
const doserviceGetProductDetail = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_AZUREWEBSITES}get-round-information`, data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                // 'Authorization' : token
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
    doserviceGetProduct,
    doserviceGetProductDetail
}

export default apis;