import React, { useState, useEffect } from 'react'
import REACTLOGO from './images/2dpunk.jpeg'
import BACKGROUND from './images/background.png'

function NFTRow(props) {

    const[owner, setOwner] = useState('')

    const load = async() => {
        let owner = ''
    try{
        owner = await props.contract.methods.ownerOf(props.id).call()
        setOwner(owner)
    } catch{
        owner = 'pending...'
        setOwner(owner)

        setInterval(() => {   //recursion
            load()
        }, 2000)
    }
}

    useEffect(() => {
       load()
    }, [])

    return( 
        <tr>
            <td><h1 style={{color: 'white', fontSize: "17px"}}>{props.id}</h1></td>
            <td><h1 style={{color: 'white', fontSize: "15px"}}>{owner}</h1></td>
            <td>
                <img src = {REACTLOGO} width = "70px" height = "70px" alt="" />
            </td>
        </tr>
    )

}
export default NFTRow

