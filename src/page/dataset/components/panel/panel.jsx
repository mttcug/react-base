import React, { useState } from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
import { Divider } from 'antd';
import './panel.less'


const Operation = (props) => {
    const { data, operate } = props
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3055349_mpp8qstu75n.js',
    })
    return (
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
                    // setStar(data)
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
    )
}

export default (props) => {
    const { data, operate, navigateTo } = props
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
                {/* 接待机构数量*/}
                { (data.institute_count || data.institute_count === 0) && (<span className='red'>{data.institute_count}</span>) }
                {/* 机构数变化 */}
                { (data.institute_change || data.institute_change === 0) && (<span className={ data.institute_change > 0 ? 'red' : 'green' }>{data.institute_change}</span>) }
                {/* 持股比例增幅 */}
                { data.hold_change && (<span className={ data.hold_change > 0 ? 'red' : 'green' }>{data.hold_change}</span>) }
            </section>
            <Divider className='divider' />
            {
                operate.length > 0 && <Operation operate={operate} data={data} />
            }
            <section className='detail'>
                <div></div>
            </section>
        </div>
    )
}