import React, {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import {Login, Product, Navbar, Register, SellerLogin, SellerRegister, Logout, Locations, CreateLocation, ProductByLocation, CreateProduct, ProductDetails, Sellers, ProductForLocation} from './index'

const App = () => {
    const [product, setProduct] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isSeller, setIsSeller] = useState(false)

    useEffect(()=> {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
        }
        if (localStorage.getItem('seller')) {
            setIsSeller(true)
        }
    }, [])
  

    return (
        <div>
            <div>
                <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setIsSeller={setIsSeller} isSeller={isSeller}/>
            </div>
            {isLoggedIn && isSeller ? (
                <Routes>
            <Route exact path='/'
                element={<Product isLoggedIn={isLoggedIn} product={product} setProduct={setProduct}/>}/>
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


                </Routes>
                ) : !isSeller && isLoggedIn ? (
                    <Routes>
                        <Route path='logout'
                element={<Logout setIsLoggedIn={setIsLoggedIn} setIsSeller={setIsSeller}/>}/>
                    <Route exact path='/'
                element={<Product isLoggedIn={isLoggedIn} product={product} setProduct={setProduct}/>}/>
                <Route path='sellers'
                element={<Sellers/>}/>
                <Route path='productDetails'
                element={<ProductDetails/>}/>
                <Route path='productForLocation'
                element={<ProductForLocation/>}/>
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
                element={<Product isLoggedIn={isLoggedIn} product={product} setProduct={setProduct}/>}/>
                <Route path='productDetails'
                element={<ProductDetails/>}/>
                 <Route path='sellers'
                element={<Sellers/>}/>
                <Route path='productForLocation'
                element={<ProductForLocation/>}/>
                
                    </Routes>
                )}
                
           
        </div>
    )
}

export default App