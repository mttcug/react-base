import axios from 'axios'

const get = (apiUrl, params, headers) => {
    const url = `http://127.0.0.1:5000${apiUrl}`
    return axios.request({
        headers,
        method: 'get',
        url,
        params
    }).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

const post = (apiUrl, data, headers) => {
    const url = `http://120.77.44.209${apiUrl}`
    return axios.request({
        headers,
        method: 'post',
        url,
        data
    }).then(res => {
        return res
    }).catch(err => {
        return err
    })
}

export default {
    get,
    post
}