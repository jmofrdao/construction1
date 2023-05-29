import React, {useState, useEffect} from 'react'
import { getProductsByLocation } from '../api'
import { useLocation } from 'react-router'

const ProductForLocation = () => {
    const [productLocation, setProductLocation] = useState([])
    const location = useLocation()
    const {locationId} = location.state
console.log(locationId, 'id')
    async function getProductsForLocation () {
        const theProducts = await getProductsByLocation(locationId)
        setProductLocation(theProducts)
    }

useEffect(() => {
    getProductsForLocation()
}, [])
console.log(productLocation, 'prod')

let productLocationMap = []
 productLocationMap = productLocation.map((product, index) => {
return (
    <div key={`Product For Location ${index}`}>
                <h1>{product.name}</h1>
                <h3>Price: ${product.price}</h3>
                <h3>Available: {product.inventory}</h3>
                {product.description ? <h4>Description: {product.description}</h4> : null }
                </div>
)
})

    return (
        <div>
            {productLocationMap}
        </div>
    )
}

export default ProductForLocation