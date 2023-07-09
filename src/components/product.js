import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { getAllProducts } from "../api"
import {Search, LocationForProduct, ProductDetails, Add2cart} from './index'

const Product = ({product, setProduct, isLoggedIn, cart, setCart, guestCart, setGuestCart}) => {
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
                    <h1>{prod.name}</h1>
                    <h3>Price: ${prod.price}</h3>
                    <LocationForProduct locationId={prod.locationId}/>
                    <NavLink to='/productDetails'
                    state={{productId: prod.id}}
                    >Details</NavLink>
                    <Add2cart product={product} setProduct={setProduct} productId={prod.id} productPrice={prod.price} guestCart={guestCart} setGuestCart={setGuestCart} isLoggedIn={isLoggedIn}/>
                    
                </div>
            )
        })
    } else {
     productMap = product.map((prod, index)=> {
        return (
            <div key={`Product ${index}`}>
                <h1>{prod.name}</h1>
                <h3>Price: ${prod.price}</h3>
                <LocationForProduct locationId={prod.locationId}/>
                <NavLink to='/productDetails'
                state={{productId: prod.id, locationId: prod.locationId}}
                >Details</NavLink>
                <Add2cart product={product} setProduct={setProduct} productId={prod.id} productPrice={prod.price} guestCart={guestCart} setGuestCart={setGuestCart} isLoggedIn={isLoggedIn}/>
                
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