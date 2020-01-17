const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const EmployeeSchema = mongoose.Schema({
	taxId: {
		type: Number,
        max: 9,
        unique: true,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	birthDate: {
		type: Date,
		required: true,
	},
	hireDate: {
		type: Date,
		required: true,
	},
	companyId: {
		type: Number,
		required: true,
	},
});