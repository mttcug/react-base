import axios from 'axios'

const get = (url, params, headers) => {
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

const post = (url, data, headers) => {
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