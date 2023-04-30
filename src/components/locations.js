import React, {useState, useEffect} from 'react'
import { getLocationsBySeller, getSeller } from '../api'
import {CreateLocation, RemoveLocation} from './index'
import { NavLink } from 'react-router-dom'

const Locations = (product, setProduct) => {
const [myLocations, setMyLocations] = useState([])
const [isShown, setIsShown] = useState(false)


async function fetchMyLocations() {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const seller = await getSeller(token)
    console.log(seller, 'seller')
    if (seller.username === username) {
        const allLocations = await getLocationsBySeller(username)
        setMyLocations(allLocations)
    }
}

useEffect(()=> {
    fetchMyLocations()
}, [])

async function buttonClick() {
    setIsShown((current)=> !current)
}



const locationMap = myLocations.map((location, index)=> {
    return (
        <div key={`Location ${index}`}>
            <h1>Address: {location.address}</h1>
            <h3>State: {location.state}</h3>
            <h3>City: {location.city}</h3>
            <h4>Zip: {location.zip}</h4>
            <h4>Phone: {location.phone}</h4>
            <NavLink to='/productByLocation'
            state={{locationId: location.id}}>
                View Products for {location.address}
            </NavLink>
            <RemoveLocation locationId={location.id} myLocations={myLocations} setMyLocations={setMyLocations}/>
        </div>
    )
})
    return (
        <div>
            {locationMap}
            <button onClick={buttonClick}>Add a Location</button>
            {isShown && (<CreateLocation myLocations={myLocations} setMyLocations={setMyLocations} setIsShown={setIsShown}/>)}
            
            
        </div>
    )
}

export default Locations