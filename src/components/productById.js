import React, {useState, useEffect} from 'react'
import { getProductsById } from '../api'

const ProductById = ({productId}) => {
    const [theProduct, setTheProduct] = useState([])

    async function getProductId () {
        const fetchTheProduct = await getProductsById(productId)
        setTheProduct(fetchTheProduct)
    }

    useEffect(() => {
     getProductId()
    }, [])

    console.log(theProduct, 'the product')

    return (
        <div>
            <h1>Name: {theProduct.name}</h1>
            {theProduct.description ? <h4>Description: {theProduct.description}</h4> : null}

        </div>
    )
}

export default ProductById