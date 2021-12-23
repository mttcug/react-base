import React, { lazy, memo } from 'react'

export default (url) => {
    const Component = memo(lazy(() => import(/* webpackChunkName: 'async-module' */ `～/${url}`)))
    return (props) => <Component {...props} />
}
