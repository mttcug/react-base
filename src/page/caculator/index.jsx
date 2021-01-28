import React, { useState } from 'react'

const caculator = () => {
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    const [c, setC] = useState(0)
    return (
        <div>
            <input type="number" defaultValue={a} ref={(val) => {setA(val);setC(val + b)}} />
            +
            <input type="number" defaultValue={b} ref={(val) => {setB(val);setC(val + a)}}/>
            =
            <input type="number" defaultValue={c} disabled />
        </div>
    )
}

export default caculator
