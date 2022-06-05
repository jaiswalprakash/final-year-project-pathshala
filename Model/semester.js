var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var semesterSchema = new Schema({
    semesterName:{
        type:String,
        required:true
    },
    semesterId:{
        type:String,
        required:true
    }

    
  });
  module.exports=mongoose.model("semester",semesterSchema)