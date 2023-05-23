import React, {useState} from 'react'
import { loginSeller } from '../api'
import { useNavigate } from 'react-router-dom'

const SellerLogin = ({setIsLoggedIn, setIsSeller}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await loginSeller(username, password)
        console.log(result, 'result')
        const token = result.token
        if (result.error) {
            setError(result)
        } else if (result.token) {
            setError(null)
            const username = result.seller.username 
            const seller = result.seller.company 
            localStorage.setItem('username', username)
            localStorage.setItem('token', token )
            localStorage.setItem('seller', seller)
            setIsSeller(true)
            setIsLoggedIn(true)
            navigate('/locations')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Seller Log In!</h1>
                <label>Username: 
                    <input type='text' value={username} name='username' onChange={(event)=> {setUsername(event.target.value)}}/>
                </label>
                <label>Password: 
                    <input type='password' value={password} name='password' onChange={(event)=> {setPassword(event.target.value)}}/>
                </label>
                <button type='submit'>Log In</button>
            </form>
            {error && error.message ? <h3>{error.message}</h3> : null}
        </div>
    )
}

export default SellerLogin