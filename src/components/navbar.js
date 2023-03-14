import { NavLink } from "react-router-dom"

const Navbar = () => {

    return (
      <div>
          <header>
              {/* <NavLink to='/'>Home</NavLink> */}
              <NavLink to='/login'>Login</NavLink>
          </header>
      </div>
    )
}

export default Navbar