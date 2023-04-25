import React, {useState, useEffect} from 'react'
import { createLocation } from '../api'

const CreateLocation = ({myLocations, setMyLocations, setIsShown}) => {
    const [address, setAddress] = useState('')
    const [state, setState] = useState()
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState(null)
   

    async function handleSubmit (event) {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const newLocation = await createLocation(token, address, state, city, zip, phone)
        if (newLocation.error) {
            setError(newLocation)
        } else {
            setError(null)
            setIsShown(false)
            await setMyLocations([...myLocations, newLocation])
        }
    }
    console.log(myLocations, 'locations')
useEffect(()=> {}, [myLocations])



    return (
        <div>
            <h1>Add a Location</h1>
            {error && error.message ? (
                <h3>{error.message}</h3>
            ) : null}
            <form onSubmit={handleSubmit}>
                <label>
                    <div>
                        Address:
                    </div>
                    <input type='text' placeholder='Address' value={address} onChange={(event)=> {setAddress(event.target.value)}}/>
                </label>
                <label>
                    <select id='state' value={state} type='text' onChange={(event)=>{setState(event.target.value)}}>
                        <option defaultValue>--Select State--</option>
                        <option value='Alaska'>Alaska</option>
                        <option value='Arizona'>Arizona</option>
                        <option value='Arkansas'>Arkansas</option>
                        <option value='California'>California</option>
                        <option value='Colorado'>Colorado</option>
                        <option value='Connecticut'>Connecticut</option>
                        <option value='Delaware'>Delaware</option>
                        <option value='Florida'>Florida</option>
                        <option value='Georgia'>Georgia</option>
                        <option value='Hawaii'>Hawaii</option>
                        <option value='Idaho'>Idaho</option>
                        <option value='Illinois'>Illinois</option>
                        <option value='Indiana'>Indiana</option>
                        <option value='Iowa'>Iowa</option>
                        <option value='Kansas'>Kansas</option>
                        <option value='Kentucky'>Kentucky</option>
                        <option value='Louisiana'>Louisiana</option>
                        <option value='Maine'>Maine</option>
                        <option value='Maryland'>Maryland</option>
                        <option value='Massachusetts'>Massachusetts</option>
                        <option value='Michigan'>Michigan</option>
                        <option value='Minnesota'>Minnesota</option>
                        <option value='Mississippi'>Mississippi</option>
                        <option value='Missouri'>Missouri</option>
                        <option value='Montana'>Montana</option>
                        <option value='Nebraska'>Nebraska</option>
                        <option value='Nevada'>Nevada</option>
                        <option value='New Hampshire'>New Hampshire</option>
                        <option value='New Jersey'>New Jersey</option>
                        <option value='New Mexico'>New Mexico</option>
                        <option value='New York'>New York</option>
                        <option value='North Carolina'>North Carolina</option>
                        <option value='North Dakota'>North Dakota</option>
                        <option value='Ohio'>Ohio</option>
                        <option value='Oklahoma'>Oklahoma</option>
                        <option value='Oregon'>Oregon</option>
                        <option value='Pennsylvania'>Pennsylvania</option>
                        <option value='Rhode Isalnd'>Rhode Island</option>
                        <option value='South Carolina'>South Carolina</option>
                        <option value='South Dakota'>South Dakota</option>
                        <option value='Tennessee'>Tennessee</option>
                        <option value='Texas'>Texas</option>
                        <option value='Utah'>Utah</option>
                        <option value='Vermont'>Vermont</option>
                        <option value='Virginia'>Virginia</option>
                        <option value='Washinton'>Washinton</option>
                        <option value='West Virginia'>West Virginia</option>
                        <option value='Wisconsin'>Wisconsin</option>
                        <option value='Wyoming'>Wyoming</option>
                    </select>
                    </label>
                    <label>
                        <div>
                            City:
                        </div>
                        <input type='text' placeholder='City' value={city} onChange={(event)=> {setCity(event.target.value)}}/>

                    </label>
                    <label>
                        <div>
                            Zip:
                        </div>
                        <input type='text' placeholder='zip' value={zip} onChange={(event)=> {setZip(event.target.value)}}/>
                    </label>
                    <label>
                        <div>Phone Number:</div>
                        <input type='tel' placeholder='Phone Number' value={phone} onChange={(event)=> setPhone(event.target.value)}/>
                    </label>
                    <button type='submit'>Add Location</button>
            </form>
        </div>
    )
}

export default CreateLocation