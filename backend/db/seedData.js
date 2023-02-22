const client = require('./client')
const {createUser} = require('./users')
const {createSeller} = require('./sellers')
const {createProduct} = require('./product')
const {createLocation} = require('./location')

async function dropTables () {
    try {
        await client.query(`
        DROP TABLE IF EXISTS product;
        DROP TABLE IF EXISTS location;
        DROP TABLE IF EXISTS sellers;
        DROP TABLE IF EXISTS users;
        `)
        console.log('dropping all tables')
    } catch (error) {
        throw error
    }
}

async function createTables () {
    try {
        await client.query(`
        CREATE TYPE sellerState AS ENUM ('Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming');
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR (255) NOT NULL
        );
        CREATE TABLE sellers (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            company varchar(255) NOT NULL
        );
        CREATE TABLE location (
            id SERIAL PRIMARY KEY,
            "sellerId" INTEGER REFERENCES sellers(id),
            address TEXT NOT NULL,
            state sellerState NOT NULL,
            city TEXT NOT NULL,
            zip INTEGER NOT NULL

        );
        CREATE TABLE product (
            id SERIAL PRIMARY KEY,
            "sellerId" INTEGER REFERENCES sellers(id),
            "locationId" INTEGER REFERENCES location(id),
            name varchar(255) NOT NULL,
            price INTEGER NOT NULL,
            inventory INTEGER NOT NULL,
            description TEXT
        );
        `)
    } catch (error) {
        throw error
    }
}

async function createInitialUser () {
    try {
        const usersToCreate = [
            {username: 'keeton', password:'keeton1234', email: 'keetonsmith@gmail.com'},
            {username: 'reece', password: 'reeceg1234', email: 'rgilly@gmail.com'},
            {username: 'scar', password: 'scarscar123', email: 'scarscar@gmail.com'},
        ];
        const users = await Promise.all(usersToCreate.map(createUser))
        console.log("users created!")
        console.log(users)
        console.log('finished creating users')
    } catch (error) {
        console.error('error creating users')
        throw error
    }
}

async function createInitialSeller () {
    try {
        const sellersToCreate = [
            {username: 'brownmachine1', password: 'brownbrown', email: 'brownmachinery@gmail.com', company: 'Brown Machinery OKC'},
            {username: 'brownmachine2', password: 'brownbrown21', email: "brown@gmail.com", company: 'Brown Machinery Norman'},
            {username: "brownmachine3", password: 'brownbrown3', email: 'brown2@gmail.com', company: 'Brown Machinery Edmond'},
        ];
        const sellers = await Promise.all(sellersToCreate.map(createSeller))
        console.log('seller created!')
        console.log(sellers)
        console.log('finished creating sellers')
    } catch (error) {
        console.error('error creating sellers')
        throw error
    }
}

async function createInitialLocation () {
    try {
        const locationToCreate = [
            {sellerId: 1, address: "2732 w reno ave", state: 'Oklahoma', city: 'Oklahoma City', zip: 73170},
            {sellerId: 1, address: '5640 Huettner Dr', state: 'Oklahoma', city: 'Norman', zip: 73069},
            {sellerId: 1, address: '14942 Bristol Park Blvd', state: 'Oklahoma', city: 'Edmond', zip: 73013},
            {sellerId: 1, address: '2219 W Vancouver St', state: 'Oklahoma', city: 'Broken Arrow', zip: 74012},

        ];
        const locations = await Promise.all(locationToCreate.map(createLocation))
        console.log(locations)
    } catch (error) {
        console.error('error creating location')
        throw error
    }
}
async function createInitialProduct () {
    try {
        const productToCreate = [
            {sellerId: 1, name: "Grout", price: 8, inventory: 120, description: 'price is per bag' },
            {sellerId: 2, name: "8 inch block", price: 10, inventory: 500, description: 'price is per block'},
            {sellerId: 3, name: "9 inch wire", price: 12, inventory: 1200, descrition: 'price is per foot'},
        ];
        const products = await Promise.all(productToCreate.map(createProduct))
        console.log('product created')
        console.log(products)
        console.log('finished creating product')
    } catch (error) {
        console.error('error creating product')
        throw error
    }
}

async function rebuildDB() {
    try {
        await dropTables();
        await createTables();
        await createInitialUser();
        await createInitialSeller();
        await createInitialLocation();
        await createInitialProduct()
    } catch (error) {
        throw error
    }
}

module.exports = {
    rebuildDB,
    dropTables,
    createTables,
}