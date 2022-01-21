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
import Mine from '$page/mine/mine'

const PickedStock = asyncComponent(`page/mine/picked-stock/picked-stock`)
const Posession = asyncComponent(`page/mine/posession/posession`)

const loading = <div>加载中...</div>

const App = () => {
    return (
        <Suspense fallback={loading}>
            <Router>
                <Routes>
                    <Route path='/' element={ <Home /> } />
                    <Route path='/main' element={ <Main /> } />
                    <Route path='/mine' element={ <Mine /> }>
                        {/* 我的资产 */}
                        <Route path='picked-stock' index element={ <PickedStock /> }></Route>
                        {/* 我的自选 */}
                        <Route path='posession' element={ <Posession /> }></Route>
                    </Route>
                    <Route path='/function' element={ <Function /> } />
                    <Route path='/about' element={ <About /> } />
                </Routes>
            </Router>
        </Suspense>
    )
}

render(<App />, document.getElementById('app'))