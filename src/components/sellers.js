
import React, {useState, useEffect} from 'react'
import { getAllSellers, getLocationBySellerId } from '../api'
import {LocationForSeller, SearchLocation, SellerForLocation} from './index'
import { NavLink } from 'react-router-dom'


const Sellers = () => {
    const [sellerState, setSellerState] = useState([])
    const [locationState, setLocationState] = useState([])
    const [locationFilter, setLocationFilter] = useState([])

    async function fetchSellers() {
        const getSellers = await getAllSellers()
       
        setSellerState(getSellers)
    }
   

    

    useEffect(()=> {
        fetchSellers()
    }, [])

    let sellerMap = []

    if (locationFilter.length) {
        sellerMap = locationFilter.map((seller, index)=> {
            return (
                <div key={`Seller ${index}`}>
                    <SellerForLocation sellerId={seller.id}/>
                    <LocationForSeller sellerId={seller.id} locationState={locationState} setLocationState={setLocationState}/>
                    
                </div>
            )
        })
    } else {

    

    sellerMap = sellerState.map((seller, index)=> {
        return (
            <div key={`Seller ${index}`}>
                <h1>{seller.company}</h1>
                <LocationForSeller sellerId={seller.id} locationState={locationState} setLocationState={setLocationState}/>

            </div>
        )
    })
}


    return (
        <div>
            <div>
            <SearchLocation locationFilter={locationFilter} setLocationFilter={setLocationFilter} sellerState={sellerState} locationState={locationState}/>
            </div>
            {sellerMap}
        </div>
    )
}

export default Sellers