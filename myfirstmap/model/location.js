const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    company: {type:String, required: true},
    address: {type:String, required: true},
    date: {type:String, required: false},
    lat: {type:Number, required: true},
    lng: {type:Number, required: true},
})

module.exports = mongoose.model('location', locationSchema); // 다른 파일에서 사용하도록 설정