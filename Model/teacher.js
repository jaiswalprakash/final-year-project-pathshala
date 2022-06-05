var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    description:{
        type: String,
       
    },
    teacherId: {
        type: String,
        required: true
    },
    videoCount: {
        type: String,
        default:0
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});
module.exports = mongoose.model("teacher", teacherSchema)