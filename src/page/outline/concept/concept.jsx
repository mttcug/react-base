import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import request from '../../../plugin/http/index.js'
import Panel from '../components/panel/panel.jsx'
import './concept.less'

export default () => {

    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(async () => {
        const url = '/api/getTHIndustry'
        const result = await request.get(url)
        const list = result.data.map((item, index) => {
            item.index = index
            item.key = item.code
            return item
        }) || []
        setCategories(list)
    }, [])

    return (
        <div className='concept-container'>
            <ul className='concept-list'> 
                {
                   categories.map((item, index) => <Panel key={index} data={item} navigateTo={ () => navigate('/outline/stocks', {state: item.code}) }/>) 
                }
            </ul>
        </div>
    )
}