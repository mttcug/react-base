import React, { useState, createContext, useReducer } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { PageHeader } from 'antd';
import { debounce } from '$utils/common'

import './dataset.less'
import { Layout } from 'antd';
const { Content } = Layout

const datasetContext = createContext()
const initialState = {
    title: '',
    setSearchKey: '',
    selfPick: {}
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'setTitle':
            return {
                title: action.value
            }
        case 'setSearchKey':
            return {
                searchKey: action.value
            }
        case 'setSelfPickIndustry':
            return {
                selfPick
            }
        default:
            return state
    }
}
export { datasetContext }

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const location = useLocation()
    const title = location.state
    // dispatch({ type: 'setTitle', value: title })
    const onChange = debounce((value) => dispatch({type: 'setSearchKey', value }), 300)
    return (
        <Layout className="layout dataset-layout">
            <PageHeader
                className='dataset-header'
                ghost={false}
                onBack={() => window.history.back()}
                title={title}
                extra={[
                    <input key='1'
                        type='text'
                        className='dataset-header-search'
                        placeholder='请输入代号或者名称'
                        onChange={(e) => {
                            onChange(e.target.value)
                        }}
                    />
                ]}
            />
            <Content>
                <div className="site-layout-content">
                    <datasetContext.Provider value={{ state, dispatch }}>
                        <Outlet />
                    </datasetContext.Provider>
                </div>
            </Content>
      </Layout>
    )
}