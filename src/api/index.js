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