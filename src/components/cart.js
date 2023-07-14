import React, {useState, useEffect} from 'react'
import { getUsersMe, getAllCartsByUserId, getCartItemsbyUserId} from '../api'
import {ProductById, DeleteCartItem, UpdateCartItem, Sum} from './index'

const Cart = ({isLoggedIn}) => {
    const [cartItems, setCartItems] = useState([])
    const [guestcart, setGuestCart] = useState([])

    async function getCart () {
        const token = localStorage.getItem('token')
        if (token) {
            const getUser = await getUsersMe(token)
            const fetchCart = await getAllCartsByUserId(token, getUser.id)
            const getCartItems = await getCartItemsbyUserId(fetchCart.id)
            setCartItems(getCartItems)
            
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            let prevItem = JSON.parse(localStorage.getItem("cart"));
      setGuestCart(prevItem);
        }
        getCart()
    }, [])

    console.log(cartItems, 'items')

    const item = cartItems.map((cartItem) => {
        return (
            <div key={cartItem.id}>
                <ProductById productId={cartItem.productId}/>
                <div>
                    ${cartItem.price}
                </div>
                <div>
                    <UpdateCartItem cartItemId={cartItem.id} setCartItems={setCartItems} cartItems={cartItems}/>
                </div>
                <DeleteCartItem cartItemId={cartItem.id} setCartItems={setCartItems} cartItems={cartItems}/>
            </div>
        )
    })

    return (
        <div>
            <div>
                <Sum cartItems={cartItems}/>
            </div>
            {item}
        </div>
    )
}

export default Cart