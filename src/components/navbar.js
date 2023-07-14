import { NavLink } from "react-router-dom"

const Navbar = ({setIsLoggedIn, isLoggedIn, isSeller, setIsSeller}) => {

    return (
      <div>
          <header>
              <div>
              <NavLink to='/'>Home</NavLink>
              </div>
              <div>
                  {isSeller && isLoggedIn ? (
                      <div>
                       <NavLink to='/locations'>Locations</NavLink>
                       <NavLink to='/logout'>Logout</NavLink>
                       <NavLink to='/cart'>Cart</NavLink>
                       </div>
                  ) : !isSeller && isLoggedIn ? (
                      <div>
                          <NavLink to='/logout'>Logout</NavLink>
                          <NavLink to='/sellers'>Locations</NavLink>
                          <NavLink to='/cart'>Cart</NavLink>
                      </div>
                  ) : (
                      <div>
                          <NavLink to='/login'>Login/Register</NavLink>
                          <NavLink to='/sellers'>Locations</NavLink>
                          <NavLink to='/publicCart'>Cart</NavLink>
                      </div>
                  )}
              </div>
              
              
             
          </header>
      </div>
    )
}

export default Navbar