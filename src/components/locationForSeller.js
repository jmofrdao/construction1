import React, {useState, useEffect} from 'react'
import { getLocationBySellerId } from '../api'
import {SearchLocation} from './index'
import { NavLink } from 'react-router-dom'

const LocationForSeller = ({sellerId, locationState, setLocationState}) => {

   

    async function fetchLocations() {
        const getLocations = await getLocationBySellerId(sellerId)
        console.log(getLocations, 'location')
        setLocationState(getLocations)
    }

    useEffect(()=> {
        fetchLocations()
    }, [])
    console.log(locationState, 'state')
    // let locationMap = []

    const locationMap = locationState.map((loc, index)=> {
        return (
            <div key={`Location ${index}`}>
                <h3>Location: {loc.address}. {loc.city}, {loc.state} {loc.zip}</h3>
            <h3>Phone #: {loc.phone}</h3>
            <NavLink to='/productForLocation' state={{locationId: loc.id}}>View Products for {loc.address}</NavLink>
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