import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import request from '../../../plugin/http/index.js'
import Panel from '../components/panel/panel.jsx'
import './investigate.less'
import { DatePicker, Select, Divider } from 'antd'
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
            <Option value='50'>{ '>50家' }</Option>
            <Option value="20">{ '>20家' }</Option>
            <Option value="10">{ '>10家' }</Option>
            <Option value="5">{ '>5家' }</Option>
      </Select>
    )
}

const Title = () => {
    return (
        <ul className='investigate-list-title'>
            <li>股票代码</li>
            <Divider type="vertical" className='title-divider' />
            <li>股票名称</li>
            <Divider type="vertical" className='title-divider' />
            <li>机构数量</li>
            <Divider type="vertical" className='title-divider' />
            <li>机构变化</li>
            <Divider type="vertical" className='title-divider' />
            <li>持股增幅</li>
        </ul>
    )
}

export default () => {

    const [investigation, setInvestigation] = useState([])
    const [count, setCount] = useState('5')
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
        setInvestigation(list)
    }
    return (
        <div className='investigate-container'>
            <section className='selecor-container'>
                <div className='selector'>
                    <QuarterSelector quarterChange={ quarterChange } />
                    <CountSelect countChange={ countChange } />
                </div>
                <Title />
            </section>
            <ul className='investigate-list'> 
                {
                   investigation.map((item, index) => <Panel key={index} data={item} operate={['1', '2']} navigateTo={ () => navigate('/dataset/stocks', {state: item.code}) }/>) 
                }
            </ul>
        </div>
    )
}