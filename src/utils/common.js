const debounce = (fn, period) => {
    let timer = null
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, period)
    }
}

export { debounce }