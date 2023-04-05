import React, {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import {Login, Product, Navbar, Register, SellerLogin, SellerRegister, Logout, Locations} from './index'

const App = () => {
    const [product, setProduct] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=> {
        const token = localStorage.getItem("token")
        if (token) {
            setIsLoggedIn(true)
        }
    }, [])
  

    return (
        <div>
            <div>
                <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
            </div>
            <Routes>
                <Route path='/login'
                element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route exact path='/'
                element={<Product isLoggedIn={isLoggedIn} product={product} setProduct={setProduct}/>}/>
                <Route path='register' element={<Register/>}/>
                <Route  path='sellerLogin'
                element={<SellerLogin/>}/>
                <Route path='sellerRegister'
                element={<SellerRegister/>}/>
                <Route path='logout'
                element={<Logout/>}/>
                <Route path='locations'
                element={<Locations/>}/>
            </Routes>
           
        </div>
    )
}

export default App