import 'core-js'
import 'regenerator-runtime/runtime'
import React, {lazy, Suspense} from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './app.less'
import asyncComponent from '$component/async-component/async-component'
import Home from '$page/home/home'
import Main from '$page/main/main'
import About from '$page/about/About'
import Function from '$page/function/function'
import Dataset from '$page/dataset/dataset'

const Concept = asyncComponent(`page/dataset/concept/concept`)
const Stocks = asyncComponent(`page/dataset/stocks/stocks`)
const IndustryStocks = asyncComponent(`page/dataset/industry-stocks/industry-stocks`)
const Detail = asyncComponent(`page/dataset/detail/detail`)
const Investigate = asyncComponent(`page/dataset/investigate/investigate`)
const InstituteGrade = asyncComponent(`page/dataset/institute-grade/institute-grade`)

const loading = <div>加载中...</div>

const App = () => {
    return (
        <Suspense fallback={loading}>
            <Router>
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/main' element={ <Main /> } />
                    <Route path='/dataset' element={ <Dataset /> }>
                        <Route path='' index element={ <Concept /> }></Route>
                        {/* 概念/行业板块 */}
                        <Route path='concept' index element={ <Concept /> }></Route>
                        {/* 股票列表 */}
                        <Route path='stocks' element={ <Stocks /> }></Route>
                        {/* 成分股 */}
                        <Route path='industry-stocks' element={ <IndustryStocks /> }></Route>
                        {/* 个股详情 */}
                        <Route path='detail' element={ <Detail /> }></Route>
                        {/* 机构调研 */}
                        <Route path='investigate' element={ <Investigate /> }></Route>
                        {/* 机构评级 */}
                        <Route path='institute-grade' element={ <InstituteGrade /> }></Route>
                    </Route>
                    <Route path='/function' element={ <Function /> } />
                    <Route path='/about' element={ <About /> } />
                </Routes>
            </Router>
        </Suspense>
    )
}

render(<App />, document.getElementById('app'))