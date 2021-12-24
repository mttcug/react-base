import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import request from '$plugin/http'
import Panel from '../components/panel/panel'
import {datasetContext} from '$page/dataset/dataset'
import ScrollEl from '$component/scroll/scroll.jsx'

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
        const {data} = await request.get(url, params) || {}
        const list = data && data.map((item, index) => {
            item.index = index
            item.key = item.code
            return item
        }) || []
        setCategories(list)
    }, [state.searchKey])

    return (
        <div className='concept-container'>
            <ScrollEl> 
                {
                   categories.map((item, index) => <Panel key={index} data={item} operate={['1', '3']} navigateTo={ () => {
                       navigate('/dataset/industry-stocks', {state: item.code})
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