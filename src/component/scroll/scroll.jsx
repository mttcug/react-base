import React from 'react'


export default (props) => {
    const { style, children, touchEnd } = props
    const onTouchEnd = () => {
        const divEl = document.getElementById('scrollEl')
        const scrollHeight = divEl.scrollHeight
        const scrollTop = divEl.scrollTop + divEl.offsetHeight
        if (scrollHeight <= scrollTop) {
            touchEnd && touchEnd()
            // divEl.scrollTo(scrollTop)
            console.log('----********:', scrollTop)
            // divEl.scrollTo({
            //     top: scrollTop,
            //     left: 0,
            //     behavior: 'smooth'
            // })
            // divEl.scrollIntoView({ behavior: 'smooth', block: 'end' })
            // divEl.scrollTop = scrollTop
            // divEl.scrollIntoView()
        }
    }
    return (
        <div style={style}  id='scrollEl' onTouchEnd={onTouchEnd}>
            { children }
        </div>
    )
}