import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
const coinImage = require('../../../../static/images/coins.png')
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import config from '../../config.js'
import './header-panel.less'


export default () => {
    const naviagte = useNavigate()
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3023759_r44gmj6c3pj.js',
    })
    return (
        <div className='header-container'>
            <section className='search-panel'>
                <div className='avator'>
                    <img src="https://tse1-mm.cn.bing.net/th/id/R-C.03914a5777e3263b6a8a82c80808267d?rik=f6I6oYFZGjm%2fbA&riu=http%3a%2f%2fimg.wxcha.com%2ffile%2f202001%2f12%2f295d24c49c.gif&ehk=zgdjklV49plpS0F3zaOjkFUoi48LzVUoJpV%2fWOen5Zc%3d&risl=&pid=ImgRaw&r=0" alt=""/>
                </div>
                <div className='search-input'>
                    <input type="text" placeholder='请输入您想要查询的关键字' />
                </div>
            </section>
            <section className='main-func'>
                <ul className='funs'>
                    {
                        config.headerConf.map((item) => 
                            <li 
                                key={item.name}
                                onClick={() => {
                                    naviagte(item.navigateUrl)
                                }}>
                                <IconFont type={item.icon} className='icon' />
                                <span className='txt'>{ item.name }</span>
                            </li>
                        )
                    }
                </ul>
            </section>
            {/* <section className='header-ads'>
                <div className='float-block'>
                    <img src={coinImage} alt=""/>
                    <span>新的活动</span>
                    <span className='btn'>马上参加</span>
                </div>
            </section> */}
        </div>
    )
}