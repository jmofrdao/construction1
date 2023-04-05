import React, {useState, useEffect} from 'react'
import { getLocationsBySeller, getSeller } from '../api'

const Locations = () => {
const [myLocations, setMyLocations] = useState([])

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

const locationMap = myLocations.map((location, index)=> {
    return (
        <div key={`Location ${index}`}>
            <h1>Address: {location.address}</h1>
            <h3>State: {location.state}</h3>
            <h3>City: {location.city}</h3>
            <h4>Zip: {location.zip}</h4>
            <h4>Phone: {location.phone}</h4>
        </div>
    )
})
    return (
        <div>
            {locationMap}
        </div>
    )
}

export default Locations