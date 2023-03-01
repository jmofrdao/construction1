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