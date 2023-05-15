import { getProductsByLocation } from "../api"
import React, {useState, useEffect} from 'react'

const LocationForProduct = ({locationId}) => {
    const [locationProd, setLocationProd] = useState([])

    async function fetchLocationForProduct (){
        const fetchLocation = await getProductsByLocation(locationId)
        setLocationProd(fetchLocation)

    }

    useEffect(()=> {
        fetchLocationForProduct()
    }, [])

    const LocationProdMap = locationProd.map((prod, index)=> {
        return (
            <div key={`Product ${index}`}>
            <h3>Location: {prod.address}. {prod.city}, {prod.state} {prod.zip}</h3>
            <h3>Phone #: {prod.phone}</h3>
            </div>
        )
    })

    return (
        <div>
            {LocationProdMap}
        </div>
    )
}

export default LocationForProduct