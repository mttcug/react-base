import React, { useState } from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
import { Divider } from 'antd';
import './panel.less'


export default (props) => {
    const { data, operate, navigateTo } = props
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3055349_71rjv7i1bj9.js',
    })

    const setStar = (data) => {
        data.star = true
    }

    return (
        <div className='panel-container'>
            <section className='panel-content' onClick={() => {
                navigateTo()
            }}>
                <span>{data.code}</span>
                <span>{data.name}</span>
                {/* 成分股数量 */}
                { data.count && (<span>{data.count}</span>) }
                {/* 流通市值 */}
                { data.flow_current && (<span>{data.flow_current}</span>) }
                {/* 现价 */}
                { data.price && (<span>{data.price}元</span>) }
                {/* 涨跌幅 */}
                { data.price_change && (<span className={ data.price_change > 0 ? 'red' : 'green' }>{Math.abs(data.price_change) || 0}%</span>) }
            </section>
            <Divider className='divider' />
            <section className='btns'>
                {
                    operate.indexOf('1') > -1 &&
                    <div className='btn'>
                        <IconFont type={'icon-detail'} className='icon' />
                        <span>详情</span>
                    </div>
                }
                {
                    operate.indexOf('2') > -1 &&
                    <div className='btn' onClick={() => {
                        setStar(data)
                    }}>
                        <IconFont type={ data.star ? 'icon-underlined' : 'icon-underline'} className='icon' />
                        <span>关注</span>
                    </div>
                }
                {
                    operate.indexOf('3') > -1 &&
                    <div className='btn'>
                        <IconFont type={'icon-trend'} className='icon' />
                        <span>指数</span>
                    </div>
                }
            </section>
            <section className='detail'>
                <div></div>
            </section>
        </div>
    )
}