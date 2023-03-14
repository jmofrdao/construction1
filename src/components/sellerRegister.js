import React, {useState} from 'react'
import { registerSeller } from '../api'
import { useNavigate } from 'react-router'
const SellerRegister = () => {
    const navigate = useNavigate()
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [secondPass, setSecondpass] = useState('')
const [email, setEmail] = useState('')
const [company, setCompany] = useState('')
const [error, setError] = useState(null)
const [myResult, setMyresult] = useState(null)

const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await registerSeller(username, password, secondPass, email, company)
    const token = result.token
    if (result.error) {
        setError(result)
        setMyresult(null)
    } else if (token) {
        setError(null)
        setMyresult(result)
        setUsername('')
        setPassword('')
        setSecondpass('')
        setEmail('')
        setCompany('')
        navigate('/sellerLogin')
    }
}

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Register Account as a Seller</h2>
                <label>Username: 
                    <input type='text' name='username' value={username} onChange={(event)=> {setUsername(event.target.value)}}/>
                </label>
                <label>Password: 
                    <input type='password' name='password' value={password} onChange={(event)=> {setPassword(event.target.value)}}/>
                </label>
                <label>Retype Password: 
                    <input type='password' name='secondPassword' value={secondPass} onChange={(event)=> {setSecondpass(event.target.value)}}/>
                </label>
                <label>Email: 
                    <input type='text' name='email' value={email} onChange={(event)=> {setEmail(event.target.value)}}/>
                </label>
                <label>Company Name: 
                    <input type='text' name='company' value={company} onChange={(event)=> {setCompany(event.target.value)}}/>
                </label>
                {error && error.message ? <h3>{error.message}</h3> : null}
        {myResult && myResult.message ? <h3>{myResult.message}</h3> : null}
                <button type='submit'>Register!</button>
            </form>
        </div>
    )
}

export default SellerRegister