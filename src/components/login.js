import React, {useState} from 'react'
import { loginUser } from '../api'


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const result = await loginUser(username,password)
        const token = result.token
        if (result.error) {
            setError(result)

        } else if (token) {
            setError(null)
            const username = result.error.username
            localStorage.setItem("username", username)
            localStorage.setItem("token", token)

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
                    <input value={password} type='text' name='password' onChange={(event)=> {setPassword(event.target.value)}}/>
                </label>
                <button type='submit'>Log In</button>
            </form>

        </div>
    )
}

export default Login