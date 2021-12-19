import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Carousel, Tabs } from 'antd'
const { TabPane } = Tabs
import { createFromIconfontCN } from '@ant-design/icons';
import config from './config.js'
import './function.less'

export default () => {
    const navigate = useNavigate()
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3023759_vsox53egc9m.js',
    })
    return (
        <div className='function-container'>
            <section className='content-funcs'>
                <ul className='funs'>
                    {
                        config.contentModuleFunc.map((item) => 
                            <li 
                                key={item.name}
                                onClick={() => {
                                    navigate(item.navigateUrl)
                                }}>
                                <IconFont type={item.icon} className='icon' />
                                <span className='txt'>{ item.name }</span>
                            </li>
                        )
                    }
                </ul>
            </section>
        </div>
    )
}