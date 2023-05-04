import React, {useState} from 'react'
import { addProduct } from '../api'
import { useLocation } from 'react-router'

const CreateProduct = ({product, setProduct}) => {
const [name, setName] = useState('')
const [price, setPrice] = useState(0)
const [inventory, setInventory] = useState(0)
const [description, setDescription] = useState('')
const [error, setError] = useState(null)
const [myResult, setMyResult] = useState(null)
const location = useLocation()
const {locationId} = location.state

async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const newProduct = await addProduct(token, locationId, name, price, inventory, description)
    if (newProduct.error) {
        setError(newProduct)
        setMyResult(null)
    } else {
        setError(null)
        setMyResult(newProduct)
        await setProduct([newProduct, ...product])
    }
}


    return (
        <div>
            <h1>Add a Product</h1>
            {error && error.message ? (
                    <h2>{error.message}</h2>
                ) : null }
                {myResult  ? <h2>Sucessfully added {name}!</h2> : null}
                <label></label>
            <form onSubmit={handleSubmit}>
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

export default CreateProduct