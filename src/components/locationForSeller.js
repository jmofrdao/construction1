import React, {useState, useEffect} from 'react'
import { getLocationBySellerId } from '../api'
import {SearchLocation} from './index'

const LocationForSeller = ({sellerId, locationState, setLocationState}) => {
   

    async function fetchLocations() {
        const getLocations = await getLocationBySellerId(sellerId)
        console.log(getLocations)
        setLocationState(getLocations)
    }

    useEffect(()=> {
        fetchLocations()
    }, [])
    console.log(locationState)
    // let locationMap = []

    const locationMap = locationState.map((loc, index)=> {
        return (
            <div key={`Location ${index}`}>
                <h3>Address: {loc.address}</h3>
            </div>
        )
    })

    return (
        <div>
            {locationMap}
        </div>
    )
}

export default LocationForSeller