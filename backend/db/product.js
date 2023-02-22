const client = require('./client')

async function createProduct({sellerId, locationId, name, price, inventory, description}) {
    try {
        const {rows: [product]} = await client.query(`
        INSERT INTO product ("sellerId", "locationId", name, price, inventory, description)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [sellerId, locationId, name, price, inventory, description])

        return product
    } catch (error) {
        throw error
    }
}

module.exports = {
    createProduct
}