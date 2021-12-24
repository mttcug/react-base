import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import request from '../../../plugin/http/index.js'
import Panel from '../components/panel/panel.jsx'
import './investigate.less'
import { DatePicker, Select } from 'antd'
const { Option } = Select

const QuarterSelector = (props) => {
    return (
        <DatePicker
            picker="quarter"
            bordered={true}
            placeholder={'请选择季度'}
            onChange={ (val, valStr) => { props.quarterChange(val, valStr) } }
        />
    )
}

const CountSelect = (props) => {
    return (
        <Select
            showSearch
            placeholder='选择筛选条件'
            onChange={(val) => { props.countChange(val) }}
        >
            <Option value='100'>{ '>100家' }</Option>
            <Option value="50">{ '>50家' }</Option>
            <Option value="20">{ '>20家' }</Option>
            <Option value="10">{ '>10家' }</Option>
      </Select>
    )
}

export default () => {

    const [investigation, setInvestigation] = useState([])
    const [count, setCount] = useState('20')
    const [quarter, setQuarter] = useState('20213')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(async () => {
        const params = {
            count,
            quarter
        }
        query(params)
    }, [])
    // 选择调研家数底线
    const countChange = (val) => {
        setCount(val)
        const params = {
            count: val,
            quarter
        }
        query(params)
    }
    // 选择调研季度
    const quarterChange = (val, valStr) => {
        const real_value = valStr.replace(/[^\d]/g, '')
        setQuarter(real_value)
        const params = {
            count,
            quarter: real_value
        }
        query(params)
    }

    const query = async (params) => {
        const url = '/api/instituteHold'
        const result = await request.get(url, params)
        const list = result.data || []
        console.log('-llllllL', list)
        setInvestigation(list)
    }
    return (
        <div className='investigate-container'>
            <section className='selector'>
                <QuarterSelector quarterChange={ quarterChange } />
                <CountSelect countChange={ countChange } />
            </section>
            <ul className='investigate-list'> 
                {
                   investigation.map((item, index) => <Panel key={index} data={item} operate={['1', '2']} navigateTo={ () => navigate('/dataset/stocks', {state: item.code}) }/>) 
                }
            </ul>
        </div>
    )
}