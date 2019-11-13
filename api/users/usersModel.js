const db = require('../../data/dbConfig');

function getUsers() {
    return db('users');
}

function createUser(userDetails) {
    return db('users').insert(userDetails);
}

module.exports = {
    getUsers,
    createUser,
}