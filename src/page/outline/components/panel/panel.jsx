import React from 'react'
import './panel.less'
export default (props) => {

    const data = props.data

    return (
        <div className='panel-container' onClick={() => {
            props.navigateTo()
        }}>
            <section className='panel-content'>
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
        </div>
    )
}