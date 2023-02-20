const client = require('./client')
const {createUser} = require('./users')

async function dropTables () {
    try {
        await client.query(`
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

async function rebuildDB() {
    try {
        await dropTables();
        await createTables();
        await createInitialUser()
    } catch (error) {
        throw error
    }
}

module.exports = {
    rebuildDB,
    dropTables,
    createTables,
}