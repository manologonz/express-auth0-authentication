const {MongoClient} = require('mongodb');
let database = null;

async function startDatabase() {
    try {
        const connection = await MongoClient.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
        database = connection.db();
    } catch(err) {
        console.log(err);
    }
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database
}

module.exports = {
    getDatabase,
    startDatabase
}
