import React from 'react'
import './home.less'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div className='home-container'>
            <h2 className='title'>欢迎来到小可爱的主页</h2>
            <Link to='/main'>
                <img className='img' src="https://tse1-mm.cn.bing.net/th/id/R-C.03914a5777e3263b6a8a82c80808267d?rik=f6I6oYFZGjm%2fbA&riu=http%3a%2f%2fimg.wxcha.com%2ffile%2f202001%2f12%2f295d24c49c.gif&ehk=zgdjklV49plpS0F3zaOjkFUoi48LzVUoJpV%2fWOen5Zc%3d&risl=&pid=ImgRaw&r=0" alt=""/>
            </Link>
        </div>
    )
}