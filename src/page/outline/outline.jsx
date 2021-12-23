import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { PageHeader } from 'antd';

import './outline.less'
import { Layout } from 'antd';
const { Content } = Layout

export default (props) => {
    const location = useLocation()
    const title = location.state
    return (
        <Layout className="layout outline-layout">
            <PageHeader
                className='outline-header'
                ghost={false}
                onBack={() => window.history.back()}
                title={title}
                extra={[
                    <input key='1' type='text' className='outline-header-search' placeholder='请输入代号或者名称' />
                ]}
            />
            <Content>
                <div className="site-layout-content">
                    <Outlet />
                </div>
            </Content>
      </Layout>
    )
}