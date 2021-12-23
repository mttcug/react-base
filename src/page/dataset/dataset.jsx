import React, { useEffect, createContext, useReducer } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { PageHeader } from 'antd';
import { debounce } from '$utils/common'

import './dataset.less'
import { Layout } from 'antd';
const { Content } = Layout

const datasetContext = createContext()
const initialState = {
    title: '',
    searchKey: '',
    selfPick: {}
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'setTitle':
            return {
                ...state,
                title: action.value
            }
        case 'setSearchKey':
            return {
                ...state,
                searchKey: action.value
            }
        case 'setSelfPickIndustry':
            return {
                ...state,
                selfPick
            }
        default:
            console.log('********default')
            return {
                ...state,
                ...action.value
            }
    }
}
export { datasetContext }

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const location = useLocation()
    const title = location.state
    useEffect(() => {
        dispatch({ type: 'setTitle', value: title || state.title })
    }, [])
    const onInput = debounce((value) => dispatch({type: 'setSearchKey', value }), 500)

    return (
        <Layout className="layout dataset-layout">
            <PageHeader
                className='dataset-header'
                ghost={false}
                onBack={() => window.history.back()}
                title={state.title}
                extra={[
                    <input key='1'
                        type='text'
                        className='dataset-header-search'
                        placeholder='请输入代号或者名称'
                        onInput={(e) => {
                            onInput(e.target.value)
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