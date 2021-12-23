import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons';
import { Divider } from 'antd';
import './company-panel.less'
export default (props) => {

    const data = props.data
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_3055349_8vvgtblzdoa.js',
    })

    return (
        <div className='panel-container' onClick={() => {
            props.navigateTo()
        }}>
            <section className='panel-content'>
                <span>{data.code}</span>
                <span>{data.name}</span>
                {/* 接待机构数量*/}
                { data.institute_count && (<span className='red'>{data.institute_count}</span>) }
                {/* 接待日期 */}
                { data.receive_date && (<span>{data.receive_date}</span>) }
            </section>
            <Divider className='divider' />
            <section className='btns'>
                <div className='btn'>
                    <IconFont type={'icon-underline'} className='icon' />
                    <span>关注</span>
                </div>
                <div className='btn'>
                    <IconFont type={'icon-trend'} className='icon' />
                    <span>指数</span>
                </div>
            </section>
        </div>
    )
}