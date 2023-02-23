const client = require('./client')

async function createLocation ({sellerId, address, state, city, zip, phone}) {
    try {
        const {rows: [location]} = await client.query(`
        INSERT INTO location ("sellerId", address, state, city, zip, phone)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [sellerId, address, state, city, zip, phone])

        return location
    } catch (error) {
        throw error
    }
}

module.exports = {
    createLocation
}