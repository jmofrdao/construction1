import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { getAllProducts } from "../api"

const Product = ({product, setProduct, isLoggedIn}) => {

    async function fetchProducts () {
        const getProducts = await getAllProducts()
        setProduct(getProducts)
    }

    useEffect(()=> {
        fetchProducts()
    }, [])

    const productMap = product.map((prod, index)=> {
        return (
            <div key={`Product ${index}`}>
                <h1>Name: {prod.name}</h1>
                <h3>Price: ${prod.price}</h3>
                <h3>Available: {prod.inventory}</h3>
                {prod.description ? <h4>Description: {prod.description}</h4> : null}
                
            </div>
        )
    })

    return (
        <div>
            {productMap}
        </div>
    )
}

export default Product