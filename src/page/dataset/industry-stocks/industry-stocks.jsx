import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import request from '../../../plugin/http/index.js'
import Panel from '../components/panel/panel.jsx'
import ScrollEl from '$component/scroll/scroll.jsx'
import './industry-stocks.less'

export default () => {

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
                   stocks.map((item, index) => <Panel key={index} data={item} navigateTo={ () => navigate('/dataset/detail', {state: item.code}) }/>) 
                }
            </ScrollEl>
        </div>
    )
}