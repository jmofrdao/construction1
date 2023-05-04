import React, {useEffect} from 'react'
import { deleteProduct, getProductsByLocation } from "../api"

const DeleteProduct = ({productId, productLocation, setProductLocation, locationId}) => {
    async function handleDelete (event) {
        event.preventDefault()
        const token = localStorage.getItem('token')
        await deleteProduct(token, productId)
        const theNewProducts = await getProductsByLocation(locationId)
        setProductLocation(theNewProducts)
    }
    useEffect(()=> {}, [productLocation])

    return (
        <div onClick={handleDelete}>
            <button type='submit'>Remove Product</button>
        </div>
    )
}

export default DeleteProduct