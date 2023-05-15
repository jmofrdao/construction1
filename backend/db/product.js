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

async function destroyProduct (id) {
    try {
        const {
          rows: [product],
        } = await client.query(
          `
        DELETE FROM product
        WHERE id = $1
        RETURNING *;
        `,
          [id]
        );
        console.log(product, "DELETING PRODUCT");
        return product;
      } catch (error) {
        throw error;
      }}

      async function updateProduct ({productId, ...fields}) {
        const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");
    
        if (setString.length === 0) {
          return;
        }
        try {
          const {
            rows: [product],
          } = await client.query(
            `
        UPDATE product
        SET ${setString}
        WHERE id=${productId}
        RETURNING *;
        `,
            Object.values(fields)
          );
          return product;
      } catch (error) {
        throw error;
      }
    }

    async function getProductByLocation(locationId) {
      try {
        const {rows: product} = await client.query(`
        SELECT product.*, location.*
        FROM product
        JOIN location ON product."locationId" = location.id
        WHERE location.id=${locationId}
        `)
        return product
      } catch (error) {
        throw error
      }
    }


    async function updateProduct({ productId, ...fields }) {
      const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");
    
        if (setString.length === 0) {
          return;
        }
        try {
          const {
            rows: [product],
          } = await client.query(
            `
        UPDATE product
        SET ${setString}
        WHERE id=${productId}
        RETURNING *;
        `,
            Object.values(fields)
          );
          return product;
      } catch (error) {
        throw error;
      }
    }

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    destroyProduct,
    updateProduct,
    getProductByLocation
}