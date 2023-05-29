const BASE_URL = "http://localhost:3001/api"

export const loginUser = async (username,password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username, 
                    password
                }
            })
        })
        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

export const registerUser = async (username, password, email, secondPass) => {
    try {
        const response = await fetch (`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username,
                    password,
                    email,
                    secondPass
                }
            })
        })
        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/product`, {
            headers: {
                'Content-Type': 'applpication/json',
            },
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export const loginSeller = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/seller/login`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                seller: {
                    username, 
                    password
                }
            })
        })
        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

export const registerSeller = async (username, password, secondPass, email, company) => {
    try {
        const response = await fetch (`${BASE_URL}/seller/register`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                seller: {
                    username,
                    password,
                    secondPass,
                    email,
                    company
                }
            })
        })
        const result = await response.json()
        console.log(result)
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (token, prodctId) => {
    const response = await fetch(`${BASE_URL}/product/${prodctId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
        }
    })
    const result = await response.json()
    console.log(result)
    return result
}

export async function getLocationsBySeller (username) {
    const response = await fetch(`${BASE_URL}/seller/${username}/locations`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json()
    return result
}

export async function getProductsByLocation (locationId) {
    const response = await fetch(`${BASE_URL}/locations/${locationId}/product`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json()
    return result
}
export async function getSeller(token) {
    const response = await fetch(`${BASE_URL}/seller/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      return result;
}

export async function createLocation (token, address, state, city, zip, phone) {
    const response = await fetch(`${BASE_URL}/locations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            address, 
            state,
            city,
            zip,
            phone
        })
    })
    const result = await response.json()
    return result
}

export async function removeLocation (token, locationId) {
    const response = await fetch(`${BASE_URL}/locations/${locationId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
        },
    });
    const result = await response.json()
    return result 
}

export async function updateProduct (token, productId, name, price, inventory, description, locationId){
    const response = await fetch(`${BASE_URL}/product/${productId}`, {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name,
            price,
            inventory,
            description,
            locationId
        })
    });
    const result = await response.json()
    return result
}

export async function addProduct (token, locationId, name, price, inventory, description) {
    const response = await fetch(`${BASE_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            locationId,
            name,
            price,
            inventory,
            description
        }),
    });
    const result = await response.json()
    return result
}

export const getProductsById = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/product/${productId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getAllSellers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/seller`, {
            headers: {
                'Content-Type': 'applpication/json',
            },
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export async function getLocationBySellerId (sellerId) {
    const response = await fetch(`${BASE_URL}/seller/${sellerId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json()
    console.log(result)
    return result
}