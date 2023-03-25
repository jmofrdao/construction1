import { NavLink, useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()
    function handleLogout() {
        
        localStorage.removeItem('token')
        localStorage.removeItem('username')
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