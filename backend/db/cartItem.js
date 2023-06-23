const client = require('./client')

async function addProductCart ({productId, cartId, quantity, price}) {
    try {const {rows: [order]} = await client.query(`
    INSERT into cartItem ("productId", "cartId", quantity, price)
    VALUES ($1, $2, $3, $4)
    RETURNONG *;
    `, [productId, cartId, quantity, price])

    return order
} catch (error) {
    throw error
}
}

async function fetchcartItemById(cartItemId) {
    try {
        const {rows: cart} = await client.query(`
        SELECT *
        FROM cartItem
        WHERE id = ${cartItemId}
        `
        )
        return cart
    } catch (error) {
        throw error
    }
}

async function fetchCartItemByUserId(id) {
    try {
        const {rows: cart} = await client.query(`
        SELECT *
        FROM cartItem
        WHERE "cartId" = ${id}
        `)
        if (!cart) {
            return null
        }
        return cart
    } catch (error) {
        throw error
    }
}

async function deleteCartItem (id) {
    try {
        const {rows: [order]} = await client.query(`
        DELETE FROM cartItem
        WHERE id = $1
        RETURNING *;
        `, [id])

        return order
    } catch (error) {
        throw error
    }
}

async function editItemQuantity ({cartItemId, quantity}) {
    const {rows: [cartItem]} = await client.query(`
    UPDATE cartItem
    SET quantity = ${quantity}
    WHERE id = ${cartItemId}
    RETURNING *;
    `, [])

    if (cartItem.cartId) {
        return cartItem
    } else {
        return false
    }
}

module.exports = {
    addProductCart,
    deleteCartItem,
    editItemQuantity,
    fetchcartItemById,
    fetchCartItemByUserId

}