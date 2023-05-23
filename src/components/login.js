import React, {useState} from 'react'
import { loginUser } from '../api'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'


const Login = ({setIsLoggedIn}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const result = await loginUser(username,password)
        console.log(result)
        const token = result.token
        if (result.error) {
            console.log(result, 'result')

            setError(result)

        } else if (token) {
            setError(null)
            console.log(result, 'result')
            const username = result.user.username
            localStorage.setItem("username", username)
            localStorage.setItem("token", token)
            setIsLoggedIn(true)
            navigate('/')

        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Log in!</h1>
                <label>
                    Username: 
                    <input value={username} type='text' name='username' onChange={(event)=> {setUsername(event.target.value)}}/>

                </label>
                <label>
                    Password:
                    <input value={password} type='password' name='password' onChange={(event)=> {setPassword(event.target.value)}}/>
                </label>
                <button type='submit'>Log In</button>
                {error && error.message ? <h3>{error.message}</h3> : null}
            </form>
            <NavLink to='/sellerLogin'>Click here for Seller Login</NavLink><br/>
            <NavLink to='/register'>Click here to Register</NavLink>
        </div>
    )
}

export default Login