import React, {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import {Login, Product, Navbar, Register, SellerLogin, SellerRegister, Logout, Locations, CreateLocation, ProductByLocation, CreateProduct, ProductDetails, Sellers, ProductForLocation, Cart, PublicCart} from './index'

const App = () => {
    const [product, setProduct] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cart, setCart] = useState([])
    const [guestCart, setGuestCart] = useState([])

    useEffect(()=> {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
        }
        if (localStorage.getItem('seller')) {
            setIsSeller(true)
        }
        if (!isLoggedIn) {
            localStorage.setItem('cart', JSON.stringify(guestCart))
        }
    }, [guestCart])
  

    return (
        <div>
            <div>
                <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setIsSeller={setIsSeller} isSeller={isSeller}/>
            </div>
            {isLoggedIn && isSeller ? (
                <Routes>
            <Route exact path='/'
                element={<Product isLoggedIn={isLoggedIn} product={product} setProduct={setProduct} cart={cart} setCart={setCart} guestCart={guestCart} setGuestCart={setGuestCart}/>}/>
                <Route path='locations'
                element={<Locations product={product} setProduct={setProduct}/>}/> 
                <Route path='/createProduct'
                element={<CreateProduct product={product} setProduct={setProduct}/>}/>
                <Route path='createLocation'
                element={<CreateLocation product={product} setProduct={setProduct}/>}/>
                  <Route path='productByLocation'
                element={<ProductByLocation/>}/>
                <Route path='logout'
                element={<Logout setIsLoggedIn={setIsLoggedIn} setIsSeller={setIsSeller}/>}/>
                <Route path='productDetails'
                element={<ProductDetails/>}/>
                <Route path='productForLocation'
                element={<ProductForLocation/>}/>
                <Route path='cart'
                element={<Cart isLoggedIn={isLoggedIn}/>}/>


                </Routes>
                ) : !isSeller && isLoggedIn ? (
                    <Routes>
                        <Route path='logout'
                element={<Logout setIsLoggedIn={setIsLoggedIn} setIsSeller={setIsSeller}/>}/>
                    <Route exact path='/'
                element={<Product isLoggedIn={isLoggedIn} product={product} setProduct={setProduct} cart={cart} setCart={setCart} guestCart={guestCart} setGuestCart={setGuestCart}/>}/>
                <Route path='sellers'
                element={<Sellers/>}/>
                <Route path='productDetails'
                element={<ProductDetails/>}/>
                <Route path='productForLocation'
                element={<ProductForLocation/>}/>
                  <Route path='cart'
                element={<Cart isLoggedIn={isLoggedIn}/>}/>
                    </Routes>
                ) : (
                    <Routes>
                        <Route path='/login'
                element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path='register' element={<Register/>}/>
                <Route  path='sellerLogin'
                element={<SellerLogin setIsLoggedIn={setIsLoggedIn} setIsSeller={setIsSeller}/>}/>
                <Route path='sellerRegister'
                element={<SellerRegister/>}/>
                <Route exact path='/'
                element={<Product isLoggedIn={isLoggedIn} product={product} setProduct={setProduct} cart={cart} setCart={setCart} guestCart={guestCart} setGuestCart={setGuestCart}/>}/>
                <Route path='productDetails'
                element={<ProductDetails/>}/>
                 <Route path='sellers'
                element={<Sellers/>}/>
                <Route path='productForLocation'
                element={<ProductForLocation/>}/>
                <Route path='publicCart'
                element={<PublicCart isLoggedIn={isLoggedIn} guestCart={guestCart} setGuestCart={setGuestCart}/>}/>
                
                    </Routes>
                )}
                
           
        </div>
    )
}

export default App