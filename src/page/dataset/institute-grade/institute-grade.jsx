import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import request from '../../../plugin/http/index.js'
import CompanyPanel from '../components/company-panel/company-panel.jsx'
import { Table, Radio, Divider } from 'antd';


export default () => {

    const [stockCode, setStockCode] = useState([])
    const navigate = useNavigate()

    useEffect(async () => {
        query(stockCode)
    }, [])

    const query = async (code) => {
        const url = '/api/instituteRecommend'
        const result = await request.get(url, { code })
        const list = result.data || []
        list.map((item, index) => {
            return {
                key: index,
                ...item
            }
        })
        setStockCode(list)
    }

    const columns = [
        {
          title: '股票代码',
          dataIndex: 'code',
        },
        {
          title: '最新评级',
          dataIndex: 'grade',
        },
        {
          title: '行业',
          dataIndex: 'industry',
        },
        {
          title: '评级日期',
          dataIndex: 'date',
        }
    ]
    return (
        <div className='concept-container'>
            <Table
                columns={columns}
                dataSource={stockCode}
            />
        </div>
    )
}