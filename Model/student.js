var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    usn:{
        type:String,
        unique:true,
        required:true
    },
   
    studentId:{
        type:String,
        required:true
    },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'branch',
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
  

    
  });
  module.exports=mongoose.model("Student",StudentSchema)