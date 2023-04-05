import { NavLink } from "react-router-dom"

const Navbar = ({setIsLoggedIn, isLoggedIn}) => {

    return (
      <div>
          <header>
              <NavLink to='/'>Home</NavLink>
              <NavLink to='/login'>Login/Register</NavLink>
              <NavLink to='/logout'>Logout</NavLink>
              <NavLink to='/locations'>Locations</NavLink>
          </header>
      </div>
    )
}

export default Navbar