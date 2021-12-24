import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Carousel, Tabs, Progress, List, Anchor } from 'antd'

const { TabPane } = Tabs
import { createFromIconfontCN } from '@ant-design/icons';
import config from '../../config.js'
import './content-panel.less'
import request from '$plugin/http/index.js'


const ProgressBar = () => {
    const [upNum, setUpNum] = useState(0)
    const [downNum, setDownNum] = useState(0)
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3023759_y0127uqjeg.js',
    })
    useEffect(async () => {
        const {data} = await request.get('/api/marketActivity') || []
        const up = data.find(item => item.item === '上涨')
        const down = data.find(item => item.item === '下跌')
        setUpNum(up.value)
        setDownNum(down.value)
    }, [])
    return (
        <section className='progress-container'>
            <Progress className='progress-bar' percent={100} strokeColor={'#fd4141'} success={{ percent: downNum * 100 / (upNum + downNum), strokeColor: '#049f04' }} showInfo={false} />
            <div className='progress-desc'>
                <p className='down'>
                    <IconFont type={'icon-down'} className='icon' />
                    <span>下跌家数：{downNum}</span>
                </p>
                <p className='up'>
                    <IconFont type={'icon-up'} className='icon' />
                    <span>上涨家数：{upNum}</span>
                </p>
            </div>
        </section>
    )
}

const Newslist =() => {
    const [list, setList] = useState([])
    useEffect(async () => {
        const { data } = await request.get('/api/getNews')
        setList(data)
    }, [])
    const onScroll = () => {
        const scrollTop = document.getElementById('newsAnchor').scrollTop
        console.log('------*****:', scrollTop)
    }
    return <Tabs defaultActiveKey="1" centered id='newsAnchor' onScroll={() => { onScroll() }}>
            {
                config.contentTabConf.map((item) => 
                    <TabPane
                        tab={<span>{item.tab}</span>}
                        key={item.key}
                    >
                        {
                            list.map((info, index) => 
                                <li className='news-list-container' key={index}>
                                    <span className='news-index'>{index + 1}、</span>
                                    <span className='news-content'>{info.news}</span>
                                    {/* <span className='news-time'>{info.time}</span> */}
                                </li>)
                        }
                    </TabPane>
                )
            }
        </Tabs>
}

export default () => {
    const navigate = useNavigate()

    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3023759_y0127uqjeg.js',
    })
    return (
        <div className='content-container'>
            <section className='content-funcs'>
                <ul className='funs'>
                    {
                        config.contentModuleFunc.map((item) => 
                            <li 
                                key={item.name}
                                onClick={() => {
                                    navigate(item.navigateUrl, {state: item.title})
                                }}>
                                <IconFont type={item.icon} className='icon' />
                                <span className='txt'>{ item.name }</span>
                            </li>
                        )
                    }
                </ul>
            </section>
            <ProgressBar />
            {/* <section className='carousel-container'>
                <Carousel dots={false} autoplay>
                    <div>
                        <h3 className='carousel-style'>1</h3>
                    </div>
                    <div>
                        <h3 className='carousel-style'>2</h3>
                    </div>
                    <div>
                        <h3 className='carousel-style'>3</h3>
                    </div>
                    <div>
                        <h3 className='carousel-style'>4</h3>
                    </div>
                </Carousel>
            </section> */}
            <Newslist />
        </div>
    )
}