var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var branchSchema = new Schema({
    branchName:{
        type:String,
        required:true,
        
    },
    branchId:{
        type:String,
        required:true
       
    }

    
  });
  module.exports=mongoose.model("branch",branchSchema)