const client = require('./client')
const bcrypt = require("bcrypt")

async function createSeller ({username,password,email,company})     {
const SALT_COUNT = 10

const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
try {
    const {rows: [seller]} = await client.query(`
    INSERT INTO sellers (username, password, email, company)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, hashedPassword, email, company])

    return seller
} catch (error) {
    throw error
}
}

module.exports = {
    createSeller
}