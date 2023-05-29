import React, {useState, useEffect} from 'react'
import {getSellersWithoutUsername} from '../api'


const SellerForLocation = ({sellerId}) => {
    const [sellerState, setSellerState] = useState([])

    async function fetchSellers () {
        const getTheSellers = await getSellersWithoutUsername(sellerId)
        setSellerState(getTheSellers)
    }

    useEffect(() => {
        fetchSellers()
    }, [])

    console.log(sellerState)


    return (
        <div>
            <h1>{sellerState.company}</h1>
        </div>
    )
}

export default SellerForLocation