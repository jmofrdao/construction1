const client = require('./client')

async function createLocation ({sellerId, address, state, city, zip}) {
    try {
        const {rows: [location]} = await client.query(`
        INSERT INTO location ("sellerId", address, state, city, zip)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `, [sellerId, address, state, city, zip])

        return location
    } catch (error) {
        throw error
    }
}

module.exports = {
    createLocation
}