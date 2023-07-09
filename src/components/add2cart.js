import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCartsByUserId, getUsersMe, addProductsToCart } from '../api'

const Add2cart = ({product, setProduct, productId, productPrice, guestCart, setGuestCart, isLoggedIn}) => {

    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState([])
    const [selectedCart, setSelectedCart] = useState([])
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    async function getCart() {
        const token = localStorage.getItem("token")

        if (token) {
            const fetchUser = await getUsersMe(token)
            const fetchTheCart = await getAllCartsByUserId(token, fetchUser.id)
            setSelectedCart(fetchTheCart)
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            localStorage.setItem('cart', JSON.stringify(guestCart))
        }
        getCart()
    }, [guestCart])

    async function handleSubmit () {
        const token = localStorage.getItem('token')
        if (token) {
            const addedCartItem = await addProductsToCart(productId, selectedCart.id, quantity, productPrice)
            console.log(addedCartItem)
            if (addedCartItem.error) {
                setError(addedCartItem)
            } else {
                setError(null)
                setCart(addedCartItem)
                
            }
        } else {
            var newcart = localStorage.getItem('cart')
            console.log(newcart,'the newcart')
            newcart = (newcart) ? JSON.parse(newcart) : []
          
        const newGuestP = product.filter(pro => pro.id === productId)
        console.log(newGuestP, 'new')
        for (let i =0; i < newGuestP.length; i++) {
        
          let info = newGuestP[i]
        newcart.push(info)  
        }
        
        
        newcart.forEach(object => {
          object.quantity = 1;
        })
          setGuestCart(newcart)
        }
    }

    return (
        <div>
            <button onClick={() => handleSubmit(productId)}>Add to Cart</button>
        </div>
    )
}

export default Add2cart