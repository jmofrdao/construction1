import React, {useState, useEffect} from 'react'
import { getProductsById, getProductsByLocation } from '../api'
import {LocationForProduct} from './index'
import { useLocation } from 'react-router-dom'

const ProductDetails = () => {
    const [productDetails, setProductDetails] = useState([])
    const location = useLocation()
    const {productId, locationId} = location.state

    console.log(productId)
    console.log(locationId, 'locationId')

    async function fetchProductDetails() {
        const getTheDetails = await getProductsByLocation(productId)
        console.log(getTheDetails)
        setProductDetails(getTheDetails)
    }

    

    useEffect(()=> {
        fetchProductDetails()
    }, [])

    const theDetailMap = productDetails.map((detail, index)=> {
        return (
            <div key={`Detail ${index}`}>
                <h1>{detail.name}</h1>
                <h3>Price: ${detail.price}</h3>
                <h3>Available: {detail.inventory}</h3>
                <h3>Location: {detail.address}. {detail.city}, {detail.state} {detail.zip}</h3>
                <h3>Phone #: {detail.phone}</h3>
                {detail.description ? <h4>Description: {detail.description}</h4> : null}
            </div>
        )
    })

    return (
        <div>
            {theDetailMap}
        </div>
    )
}

export default ProductDetails