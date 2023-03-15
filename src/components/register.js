import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { registerUser } from '../api'

const Register = () => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)
const [myResult, setMyresult] = useState(null)
const [secondPass, setSecondpass] = useState('')
const [email, setEmail] = useState('')
const navigate = useNavigate()

const handleSubmit = async (event) => {
    event.preventDefault()
    
        const result = await registerUser(username, password, email, secondPass)
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
            navigate('/login')
        }
}
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Register Account</h1>
                <label>Email: 
                    <input value={email} type='text' name='email' onChange={(event)=> {setEmail(event.target.value)}}/>
                </label>
                <label>Username: 
                    <input type='text' value={username} name='username' onChange={(event)=> {setUsername(event.target.value)}}/>

                </label>
                <label>Password: 
                    <input value={password} type='password' name='password' onChange={(event)=> {setPassword(event.target.value)}}/>

                </label>
                <label>Retype Password: 
                    <input value={secondPass} type='password' name='secondpassword' onChange={(event)=> {setSecondpass(event.target.value)}}/>
                </label>
                <button type='submit'>Register!</button>
                {error && error.message ? <h3>{error.message}</h3> : null}
                {myResult && myResult.message ? <h3>{myResult.message}</h3> : null}

            </form>

        </div>
    )
}
export default Register