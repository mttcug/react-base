import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import request from '../../../plugin/http/index.js'
import Panel from '../components/panel/panel.jsx'
import { Card } from 'antd';
import './stocks.less'

export default () => {

    const [stocks, setStocks] = useState([])
    const [activeTabKey, setActiveTabKey] = useState('A')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(async () => {
        const url = '/api/getAllSHStocks'
        const result = await request.get(url, { indicator: '主板A股' })
        const list = result.data || []
        setStocks(list)
    }, [])

    const tabListTitle = [
        {
          key: 'A',
          tab: '主板A股',
        },
        {
          key: 'B',
          tab: '主板B股',
        },
        {
          key: 'K',
          tab: '科创板',
        },
    ]
    const contentListTitle = {
        A: <p>article content</p>,
        B: <p>app content</p>,
        K: <p>project content</p>,
      }
    const onTabChange = (key) => {
        setActiveTabKey(key)
    }
    return (
        <div className='stocks-container'>
            {/* <ul className='stocks-list'> 
                {
                   stocks.map((item, index) => <Panel key={index} data={item} navigateTo={ () => navigate('/outline/detail', {state: item.code}) }/>) 
                }
            </ul> */}
            <Card
                style={{ width: '100%' }}
                title="股票列表-上证"
                tabList={tabListTitle}
                activeTabKey={activeTabKey}
                onTabChange={key => {
                    onTabChange(key)
                }}
            >
                { contentListTitle[activeTabKey] }
            </Card>
        </div>
    )
}