const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    database: process.env.DATABASE,
    database_PASSWORD: process.env.DATABASE_PASSWORD,
    masterKey: process.env.API_KEY,
    port: process.env.PORT
};
// export default config