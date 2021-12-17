import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import request from '../../../plugin/http/index.js'

export default () => {

    const [categories, setCategories] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(async () => {
        const url = 'http://120.77.44.209/api/query'
        const result = await request.get(url, { ts_code: location.state, start_date: '20210101' })
        console.log('-----pppp:', result)
        const list = result.data || []
        // setCategories(list)
    }, [])

    return (
        <div>

        </div>
    )
}