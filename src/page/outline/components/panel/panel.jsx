import React from 'react'
import './panel.less'
export default (props) => {

    const data = props.data

    return (
        <div className='panel-container' onClick={() => {
            props.navigateTo()
        }}>
            <section className='panel-content'>
                <span>{data.code || data.ts_code}</span>
                <span>{data.name}</span>
                { data.src && (<span>{data.src}</span>) }
            </section>
        </div>
    )
}