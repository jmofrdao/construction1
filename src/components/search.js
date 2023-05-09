import React, {useState} from 'react'

const Search = ({product, setProduct, productFilter, setProductFilter}) => {
    const [searchTerm, setSearchTerm] = useState("")

    function searchMatches (element, text) {
        console.log(element, 'ment')
        console.log(text, 'text')
        if (element.description === null && element.name.toLowerCase().includes(text.toLowerCase())) {
            return true
        } else if (element.description === null) {
            return false
        }
        else if (element.name.toLowerCase().includes(text.toLowerCase()) || element.description.toLowerCase().includes(text.toLowerCase()))  {
            return true;
    }
}

function handleSubmit (event) {
    event.preventDefault()
    const newFilterProduct = product.filter((element)=> searchMatches(element, searchTerm));
    {
        newFilterProduct.length
        ? setProductFilter(newFilterProduct)
        : setProductFilter([])
    }
}

    return (
        <div onSubmit={handleSubmit}>
            <form>
                <input
                id='searchbar'
                type='text'
                placeholder="Search for Products..."
                value={searchTerm}
                onChange={(event)=> {
                    setSearchTerm(event.target.value)
                }}/>
                <button type='submit'>SEARCH</button>
            </form>
        </div>
    )
}

export default Search