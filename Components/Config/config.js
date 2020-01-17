require('dotenv').config();

exports.DATABASE_URL =
	process.env.DATABASE_URL || 'mongodb://localhost:27017/mappingDataBase';
exports.PORT = process.env.PORT || 8080;


