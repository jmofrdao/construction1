const client = require('./client')

async function createCart ({userId}) {
    try {
        const {rows: [orders]} = await client.query(`
        INSERT INTO cart("userId")
        VALUES ($1)
        RETURNING *;
        `, [userId]) 

        return orders
    } catch (error) {
        throw error
    }
}

module.exports = {
    createCart
}