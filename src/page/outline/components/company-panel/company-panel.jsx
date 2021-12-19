import React from 'react'
import './company-panel.less'
export default (props) => {

    const data = props.data

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
        </div>
    )
}