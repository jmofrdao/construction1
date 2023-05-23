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

async function getSellerByUsername (username) {
    try {
        const {rows: [seller]} = await client.query(`
        SELECT *
        FROM sellers
        WHERE username=$1
        `, [username])

        return seller
    } catch (error) {
        throw error
    }
}

async function getSeller ({username,password}) {
    try {
        const seller = await getSellerByUsername(username)
        const hashedPassword = seller.password
        const isValid = bcrypt.compare(password, hashedPassword)

        if (isValid) {
            delete seller.password
            return seller
        }
    } catch (error) {
        throw error
    }
}

async function getSellerById(sellerId) {
    try {
      const {
        rows: [seller],
      } = await client.query(`
      SELECT id, username, company
      FROM sellers
      WHERE id =${sellerId};
      `);
      if (!seller) {
        return null;
      }
  
      return seller;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    createSeller,
    getSeller, 
    getSellerByUsername,
    getSellerById
}