import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom"
import { NavLink, useNavigate } from "react-router-dom"

const Logout = ({setIsSeller, setIsLoggedIn}) => {
    const navigate = useNavigate()
    function handleLogout() {
        
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('seller')
        setIsLoggedIn(false)
        setIsSeller(false)
        navigate("/")
    }

    const username = localStorage.getItem('username')
    return (
        <div>
            <h1>Are you sure you want to logout {username}?</h1>
            <NavLink to='/'>Return Home</NavLink>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout