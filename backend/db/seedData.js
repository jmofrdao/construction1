const client = require('./client')
const {createUser} = require('./users')
const {createSeller} = require('./sellers')

async function dropTables () {
    try {
        await client.query(`
        DROP TABLE IF EXISTS sellers;
        DROP TABLE IF EXISTS users;
        `)
    } catch (error) {
        throw error
    }
}

async function createTables () {
    try {
        await client.query(`
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
        )
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

async function rebuildDB() {
    try {
        await dropTables();
        await createTables();
        await createInitialUser();
        await createInitialSeller()
    } catch (error) {
        throw error
    }
}

module.exports = {
    rebuildDB,
    dropTables,
    createTables,
}