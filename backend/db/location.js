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

async function getLocationsBySeller (username) {
    try {
        const {rows: locations} = await client.query(`
        SELECT location.*, sellers.username as "sellername"
        FROM location
        JOIN sellers ON location."sellerId" = sellers.id
        WHERE username = $1
        `, [username])
        return locations
    } catch (error) {
        throw error
    }
}

async function getLocationBySellerId (sellerId) {
    try {
        const {rows: location} = await client.query(`
        SELECT location.*
        FROM location
        JOIN sellers ON location."sellerId" = sellers.id
        WHERE sellers.id=${sellerId}
        `)
        
        return location
    } catch (error) {
        throw error
    }
}

async function destroyLocation (id) {
    try {
        const {rows: [location]} = await client.query(`
        DELETE FROM location
        WHERE id = $1
        RETURNING *;
        `, [id])
    return location
    } catch (error) {
        throw error
    }
}

async function getLocationById(locationId) {
try {
    const {rows: [location]} = await client.query(`
    SELECT *
    FROM location
    WHERE id=${locationId}
    `)
    if (!location) {
        return null
    }
    return location
} catch (error) {
    throw error
}
}

module.exports = {
    createLocation,
    getLocationsBySeller,
    destroyLocation,
    getLocationById,
    getLocationBySellerId
}