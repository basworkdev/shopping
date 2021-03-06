import axios from "axios";

const doserviceUploadImage = (formData) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_ENGINE_URL}upload`, formData , {
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

const percentSell = (fullPrice , price) => {
    const discount = fullPrice - price;
    const percent = (discount/fullPrice) * 100;
    return percent;
}


const apis = {
    doserviceUploadImage,
    percentSell
}

export default apis;