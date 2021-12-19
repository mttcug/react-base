import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import request from '../../../plugin/http/index.js'
import CompanyPanel from '../components/company-panel/company-panel.jsx'


export default () => {

    const [investigation, setInvestigation] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(async () => {
        const url = '/api/organInvestigate'
        const result = await request.get(url, { date: '20211201' })
        const list = result.data || []
        setInvestigation(list)
    }, [])

    return (
        <div className='concept-container'>
            <ul className='concept-list'> 
                {
                   investigation.map((item, index) => <CompanyPanel key={index} data={item} navigateTo={ () => navigate('/outline/stocks', {state: item.code}) }/>) 
                }
            </ul>
        </div>
    )
}