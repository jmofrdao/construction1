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

async function getProductById (id) {
    try {
        const {rows: [product]} = await client.query(`
        SELECT *
        FROM product
        WHERE id=${id}
        `)
        if (!product) {
            return null
        }
        return product
    } catch (error) {
        throw error
    }
}

async function getAllProducts () {
    try {
        const {rows: id} = await client.query(`
        SELECT id
        FROM product
        `)

        const product = await Promise.all(id.map((pro)=> getProductById(pro.id)))
        return product
    } catch (error) {
        throw error
    }
}

module.exports = {
    createProduct,
    getAllProducts
}