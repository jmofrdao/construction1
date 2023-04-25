import { useEffect } from "react"
import { removeLocation, getLocationsBySeller } from "../api"

const RemoveLocation = ({locationId, myLocations, setMyLocations}) => {

    async function handleDelete(event) {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        await removeLocation(token, locationId)
        const myNewLocations = await getLocationsBySeller(username)
        setMyLocations(myNewLocations)
    } 

    // useEffect(()=> {}, [myNewLocations])
console.log(myLocations, 'new')
    return (
        <div onClick={handleDelete}>
            <button>Remove Location</button>
        </div>
    )
}

export default RemoveLocation