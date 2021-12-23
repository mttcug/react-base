import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Carousel, Tabs } from 'antd'
const { TabPane } = Tabs
import { createFromIconfontCN } from '@ant-design/icons';
import config from '../../config.js'
import './content-panel.less'

export default () => {
    const navigate = useNavigate()
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3023759_or2krsvbfpb.js',
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
            <section className='carousel-container'>
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
            </section>
            <Tabs defaultActiveKey="1" centered>
                {
                    config.contentTabConf.map((item) => 
                        <TabPane
                            tab={<span>{item.tab}</span>}
                            key={item.key}
                        >
                            {item.content}
                        </TabPane>
                    )
                }
            </Tabs>
        </div>
    )
}