import React, {useEffect} from 'react'
import { getUsersMe, removeCartItem, getCartItemsbyUserId } from '../api'

const DeleteCartItem = ({cartItems, setCartItems, cartItemId}) => {

    async function handleDelete (event) {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const fetchUser = await getUsersMe(token)
        await removeCartItem(cartItemId, token)
        const myNewCartItems = await getCartItemsbyUserId(fetchUser.id)
        setCartItems(myNewCartItems)

    }

    useEffect(() => {}, [cartItems])

    return (
        <div>
            <button onClick={handleDelete}>X</button>
        </div>
    )
}

export default DeleteCartItem