import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import request from '../../../plugin/http/index.js'
import Panel from '../components/panel/panel.jsx'
import ScrollEl from '$component/scroll/scroll.jsx'
import {datasetContext} from '$page/dataset/dataset'
import './industry-stocks.less'

export default () => {

    const { state, dispatch } = useContext(datasetContext)
    const [stocks, setStocks] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(async () => {
        const url = '/api/getTHStocksByIndustryCode'
        const result = await request.get(url, { symbol: location.state })
        const list = result.data || []
        setStocks(list)
    }, [])

    return (
        <div className='stocks-container'>
            <ScrollEl> 
                {
                   stocks.map((item, index) => <Panel key={index} data={item} operate={['1', '2']} navigateTo={ () => {
                       navigate('/dataset/detail', {state: item.code}) 
                       state.title.unshift(item.name)
                       dispatch({value: {
                           title: state.title,
                           searchKey: ''
                        }})
                    }}/>) 
                }
            </ScrollEl>
        </div>
    )
}