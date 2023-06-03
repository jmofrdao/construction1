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

async function fetchCartById (userId) {
    try {
        const {
            rows: [cart]} = await client.query(`
            SELECT *
            FROM cart
            WHERE "userId" = ${userId}
            AND "isActive" = true
            `)
            return cart
    } catch (error) {
        throw error
    }
}

async function checkoutCart (cartId) {
    const {
        rows: [cart]} = await client.query(`
        UPDATE cart 
        SET "isActive" = false
        WHERE id = ${cartId}
        RETURNING *;
        `)

        if (cart.isActive === false) {
            const fetchUserId = await fetchUserIdByCartId(cartId)
            await createCart(fetchUserId)
            return cart
        } else {
            return false
        }
}

async function fetchUserIdByCartId (cartId) {
    try {
        const {rows: [cart]} = await client.query(`
        SELECT cart."userId" FROM cartItem
        JOIN cart on cart.id = cartItem."cartId"
        WHERE cartItem."cartId" = ${cartId}
        `)
        return cart
    } catch (error) {
        throw error
    }
}

async function fetchTheOrderHistoryById (userId) {
    try {
        const {rows: cart} = await client.query(`
        SELECT *
        FROM cart
        WHERE "userId" = ${userId}
        AND "isActive" = false
        `)

        return cart
    } catch (error) {
        throw error
    }
}

module.exports = {
    createCart,
    fetchCartById,
    checkoutCart,
    fetchTheOrderHistoryById
}