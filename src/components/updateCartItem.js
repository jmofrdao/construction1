import React, {useState, useEffect} from 'react'
import { editCartItemsbyId, getCartItemsbyUserId, getUsersMe } from '../api'

const UpdateCartItem = ({cartItemId, cartItems, setCartItems}) => {
const [quantity, setQuantity] = useState(1)

async function handleSubmit (event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const user = await getUsersMe(token)
    await editCartItemsbyId(token, cartItemId, quantity)
    const editedCartItems = await getCartItemsbyUserId(user.id)
    setCartItems(editedCartItems)
}

useEffect(() => {}, [cartItems])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>QTY:
                    <input type='number' min='1' value={quantity} onChange={(event) => {setQuantity(event.target.value)}}/>
                </label>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
    
}

export default UpdateCartItem