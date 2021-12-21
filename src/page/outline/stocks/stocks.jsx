import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import request from '../../../plugin/http/index.js'
import Panel from '../components/panel/panel.jsx'
import { Cascader, Spin, Alert } from 'antd'
import ScrollEl from '../../../component/scroll/scroll.jsx'
import './stocks.less'

export default () => {

    const [stocks, setStocks] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [url, setUrl] = useState('/api/getAllStocks')
    const [selectedKey, setSelectedKey] = useState('All')
    const [indicator, setIndicator] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    const [activeTabKey, setActiveTabKey] = useState('A')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        query(['All'])
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
    const options = [
        {
            value: 'All',
            label: 'A股'
        },
        {
            value: 'SH',
            label: '上证',
            children: [
                {
                    value: '主板A股',
                    label: '主板A股'
                },
                {
                    value: '主板B股',
                    label: '主板B股'
                },
                {
                    value: '科创板',
                    label: '科创板'
                }
            ],
        },
        {
            value: 'SZ',
            label: '深证',
            children: [
                {
                    value: 'A股列表',
                    label: 'A股列表'
                },
                {
                    value: 'B股列表',
                    label: 'B股列表'
                },
                {
                    value: 'CDR列表',
                    label: 'CDR列表'
                },
                {
                    value: 'AB股列表',
                    label: 'AB股列表'
                }
            ],
        },
        {
            value: 'BJ',
            label: '北证'
        }
    ]
    const query = async (value) => {
        setShowLoading(true)
        const [urlKey, indicator] = value
        const conf = {
            'All': '/api/getAllStocks',
            'SH': '/api/getAllSHStocks',
            'SZ': '/api/getAllSZStocks',
            'BJ': '/api/getAllBJStocks'
        }
        const _url = conf[urlKey]
        setSelectedKey(urlKey)
        setIndicator(indicator)
        let params = {
            pageNum,
            pageSize: 20
        }
        if (indicator) {
            params.indicator = indicator
        }
        const result = await request.get(url, params)
        const list = [...stocks, ...result.data] || []
        setStocks(list)
        setPageNum(pageNum+1)
        setShowLoading(false)
    }

    const onChange = (value) => {
        query(value)
    }
    const onTouchEnd = async () => {
        query([selectedKey, indicator])
    }

    const Title = () => <div className='stocks-title'>
        <p className='title'>股票列表</p>
        <Cascader
            options={options}
            onChange={onChange}
            size={'large'}
            placeholder={'请选择'}
            placement={'bottomRight'}
            defaultValue={['All']}
        />
    </div>

    const styles = {
        position: 'fixed',
        width: '100%',
        top: '118px',
        left: '0',
        right: '0',
        bottom: '0',
        overflow: 'scroll'
    }
    return (
        <div className='stocks-container'>
            <Title />
            <ScrollEl style={styles} touchEnd={onTouchEnd}>
                {
                    stocks.map((item, index) => <Panel key={index} data={item} navigateTo={ () => navigate('/outline/detail', {state: item.code}) }/>) 
                }
            </ScrollEl>
            { showLoading && <Spin className='loading' tip="加载中..."></Spin> }
        </div>
    )
}