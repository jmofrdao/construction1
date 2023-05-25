import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { getAllProducts } from "../api"
import {Search, LocationForProduct, ProductDetails} from './index'

const Product = ({product, setProduct, isLoggedIn}) => {
    const [productFilter, setProductFilter] = useState([])

    async function fetchProducts () {
        const getProducts = await getAllProducts()
        setProduct(getProducts)
    }

    useEffect(()=> {
        fetchProducts()
    }, [])

    let productMap = []

    if (productFilter.length) {
        productMap = productFilter.map((prod, index)=> {
            return (
                <div key={`Product ${index}`}>
                    <h1>Name: {prod.name}</h1>
                    <h3>Price: ${prod.price}</h3>
                    <h3>Available: {prod.inventory}</h3>
                    {prod.description ? <h4>Description: {prod.description}</h4> : null}
                    <LocationForProduct locationId={prod.locationId}/>
                    <NavLink to='/productDetails'
                    state={{productId: prod.id}}
                    >Details</NavLink>
                    
                </div>
            )
        })
    } else {
     productMap = product.map((prod, index)=> {
        return (
            <div key={`Product ${index}`}>
                <h1>Name: {prod.name}</h1>
                <h3>Price: ${prod.price}</h3>
                <h3>Available: {prod.inventory}</h3>
                {prod.description ? <h4>Description: {prod.description}</h4> : null}
                <LocationForProduct locationId={prod.locationId}/>
                <NavLink to='/productDetails'
                state={{productId: prod.id, locationId: prod.locationId}}
                >Details</NavLink>
                
            </div>
        )
    })
}
console.log(product, 'prod')
    return (
        <div>
            <div>
                <Search product={product} setProduct={setProduct} productFilter={productFilter} setProductFilter={setProductFilter}/>
            </div>
            {productMap}
        </div>
    )
}

export default Product