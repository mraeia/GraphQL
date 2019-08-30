const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name:  String,
    address: {
        postalCode: String,
        street: String,
        number: Number
    }
  });

mongoose.model('Company', CompanySchema);