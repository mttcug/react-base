import React, { useEffect, createContext, useReducer } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { PageHeader } from 'antd';
import { debounce } from '$utils/common'

import './dataset.less'
import { Layout } from 'antd';
const { Content } = Layout

const datasetContext = createContext()
const initialState = {
    title: [],   // 数组的目的为了让返回时依然显示上一级的标题[凯莱英，cro, 医药]
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
        dispatch({ type: 'setTitle', value: title ? [title] : state.title})
    }, [])
    const onInput = debounce((value) => dispatch({type: 'setSearchKey', value }), 500)

    return (
        <Layout className="layout dataset-layout">
            <PageHeader
                className='dataset-header'
                ghost={false}
                onBack={() => {
                    state.title.shift()
                    dispatch({ type: 'setTitle', value: state.title})
                    window.history.back()
                }}
                title={state.title[0]}
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