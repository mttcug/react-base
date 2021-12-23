import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import request from '$plugin/http'
import Panel from '../components/panel/panel'
import {datasetContext} from '$page/dataset/dataset'
import './concept.less'

export default () => {
    const { state, dispatch } = useContext(datasetContext)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    useEffect(async () => {
        const url = '/api/getTHIndustry'
        const params = {
            keyWord: state.searchKey
        }
        const result = await request.get(url, params)
        const list = result.data.map((item, index) => {
            item.index = index
            item.key = item.code
            return item
        }) || []
        setCategories(list)
    }, [state.searchKey])

    return (
        <div className='concept-container'>
            <ul className='concept-list'> 
                {
                   categories.map((item, index) => <Panel key={index} data={item} navigateTo={ () => {
                       navigate('/dataset/industry-stocks', {state: item.code}) 
                       dispatch({value: {
                           title: item.name,
                           searchKey: ''
                        }})
                   }}/>)
                }
            </ul>
        </div>
    )
}