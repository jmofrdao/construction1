import React, {useState} from 'react'

const SearchLocation = ({locationFilter, setLocationFilter, sellerState, locationState}) => {
const [searchTerm, setSearchTerm] = useState("")

function searchMatches2 (element, text) {
    console.log(element, 'ment')
    console.log(text, 'text')
    if (element.company.toLowerCase().includes(text.toLowerCase())) {
        return true 
    }
}

function searchMatches3(element, text) {
    if (element.address.toLowerCase().includes(text.toLowerCase()) || element.city.toLowerCase().includes(text.toLowerCase()) || element.state.toLowerCase().includes(text.toLowerCase()) || element.zip.toLowerCase().includes(text.toLowerCase())) {
        return true
    }
}

function handleSubmit(event) {
    event.preventDefault()
    const filteredSellers = sellerState.filter((element) => searchMatches2(element, searchTerm))
    console.log(filteredSellers, 'sell')
    const filteredLocation = locationState.filter((element) => searchMatches3(element, searchTerm))
    console.log(filteredLocation, 'loc')
    {
        filteredSellers.length
        ? setLocationFilter(filteredSellers) 
        : filteredLocation.length 
        ? setLocationFilter(filteredLocation)
        : setLocationFilter([])
    }
}
   
return (
    <div onSubmit={handleSubmit}>
    <form>
        <input
        id='searchbar'
        type='text'
        placeholder="Search for Locations by Name, City, State, Address, or Zip..."
        value={searchTerm}
        onChange={(event)=> {
            setSearchTerm(event.target.value)
        }}/>
        <button type='submit'>SEARCH</button>
    </form>
</div>
    )
}

export default SearchLocation