import React from 'react'
import HeaderPannel from './components/header-panel/header-panel.jsx'
import ContentPanel from './components/content-panel/content-panel.jsx'

export default () => {
    return (
        <div className='main-container'>
            <HeaderPannel />
            <ContentPanel />
        </div>
    )
}