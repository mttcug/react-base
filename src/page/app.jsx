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

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/main' element={ <Main /> } />
                <Route path='/outline' element={ <Outline /> }>
                    <Route path='concept' index element={ <Concept /> }></Route>
                    <Route path='stocks' element={ <Stocks /> }></Route>
                    <Route path='detail' element={ <Detail /> }></Route>
                </Route>
                <Route path='/about' element={ <About /> } />
            </Routes>
        </Router>
    )
}

render(<App />, document.getElementById('app'))