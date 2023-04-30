import REACT, {useState, useEffect} from 'react'
import { getSeller, getProductsByLocation } from '../api'
import { useLocation } from 'react-router'
import {UpdateProduct} from './index'
const ProductByLocation = () => {
    const [productLocation, setProductLocation] = useState([])
    const location = useLocation()
    const {locationId} = location.state
    const [isShown2, setIsShown2] = useState(false)

    async function fetchProductsByLocation () {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        const seller = await getSeller(token)
        console.log(seller)
        console.log(username)
        if (seller.username === username) {
            const theProducts = await getProductsByLocation (locationId)
            console.log(theProducts)
            setProductLocation(theProducts)
        }
    }

    useEffect(()=> {
        fetchProductsByLocation()
    }, [])

    async function buttonClick2() {
        setIsShown2((current)=> !current)
        }

    const theProductLocationMap = productLocation.map((element, index)=> {
        return (
            <div key={`Product By Location ${index}`}>
                <h1>Name: {element.name}</h1>
                <h3>Price: ${element.price}</h3>
                <h3>Available: {element.inventory}</h3>
                {element.description ? <h4>Description: {element.description}</h4> : null }
                {!isShown2 ? <button onClick={buttonClick2}>Update Product</button> : <button onClick={buttonClick2}>Close Form</button>}
                {isShown2 && (<UpdateProduct productId={element.id} productLocation={productLocation} setProductLocation={setProductLocation} locationId={locationId} productName={element.name}/>)}

            </div>
        )
    })
    return (
        <div>
            {theProductLocationMap}
        </div>
    )
}

export default ProductByLocation