import React from 'react'
import { Outlet } from 'react-router-dom'
import { PageHeader } from 'antd';

import './outline.less'
import { Layout } from 'antd';
const { Content } = Layout

export default () => {

    return (
        <Layout className="layout outline-layout">
            <PageHeader
                className='outline-header'
                ghost={false}
                onBack={() => window.history.back()}
                title="Industry"
                extra={[
                    <input key='1' type='text' className='outline-header-search' placeholder='请输入code或者name' />
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