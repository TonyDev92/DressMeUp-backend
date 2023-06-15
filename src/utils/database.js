const mongoose = require('mongoose');

const connect = async() => {

    try {
        const database = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const {name, host} = database.connection;
        console.log(`Connected to ${name} database in host: ${host}`);

    } catch (error) {
        console.log(`An error occurred while trying to connect to the database : ${error}`);
    }
}

module.exports = {connect};