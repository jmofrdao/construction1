import React, {useState, useEffect} from 'react'
import { updateProduct, getProductsByLocation } from '../api'

const UpdateProduct = ({productLocation, setProductLocation, productId, locationId, productName}) => {
const [name, setName] = useState('')
const [price, setPrice] = useState(0)
const [inventory, setInventory] = useState(0)
const [description, setDescription] = useState('')
const [error, setError] = useState(null)
const [myResult, setMyResult] = useState(null)

    
async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const newProduct = await updateProduct(
        token, 
        productId,
        name,
        price,
        inventory,
        description,
        locationId
    )
    if(newProduct.error) {
        setError(newProduct)
        setMyResult(null)
    } else {
        setError(null)
        setMyResult(newProduct)
        console.log(newProduct, 'new product')
        newProduct;
        const newUpdatedProducts = await getProductsByLocation(locationId)
        console.log(newUpdatedProducts, 'new updated products')
        setProductLocation(newUpdatedProducts)
        setName('')
        setPrice(0)
        setInventory(0)
        setDescription('')
    }
}
useEffect(()=> {}, [productLocation])




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Updating {productName}</h1>
                {error && error.message ? (
                    <h2>{error.message}</h2>
                ) : null }
                {myResult && myResult.message ? <h2>Sucessfully updated {productName}</h2> : null}
                <label>
                 <div>Name:</div>   
                 <input value={name} type='text' placeholder='Name' onChange={(event)=> {setName(event.target.value)}}/>
                </label>
                <label>
                    <div>Price:</div>
                    <input value={price} placeholder='Price' type='text' onChange={(event)=> {setPrice(event.target.value)}}/>
                </label>
                <label>
                    <div>How many in stock?</div>
                    <input value={inventory} placeholder='Inevntory' type='number' onChange={(event)=> {setInventory(event.target.value)}}/>
                </label>
                <label>
                    <div>Description</div>
                    <input value={description} type='text' placeholder='Description (optional)' onChange={(event)=> {setDescription(event.target.value)}}/>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateProduct