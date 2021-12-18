import 'core-js'
import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import Home from './home/home.jsx'
import Main from './main/main.jsx'
import About from './about/About.jsx'
import Outline from './outline/outline.jsx'
import Concept from './outline/concept/concept.jsx'
import Stocks from './outline/stocks/stocks.jsx'
import Detail from './outline/detail/detail.jsx'
import Investigate from './outline/investigate/investigate.jsx'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/main' element={ <Main /> } />
                <Route path='/outline' element={ <Outline /> }>
                    {/* 概念/行业板块 */}
                    <Route path='concept' index element={ <Concept /> }></Route>
                    {/* 成分股 */}
                    <Route path='stocks' element={ <Stocks /> }></Route>
                    {/* 个股详情 */}
                    <Route path='detail' element={ <Detail /> }></Route>
                    {/* 机构调研 */}
                    <Route path='investigate' element={ <Investigate /> }></Route>
                </Route>
                <Route path='/about' element={ <About /> } />
            </Routes>
        </Router>
    )
}

render(<App />, document.getElementById('app'))