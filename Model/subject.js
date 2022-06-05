var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var subjectSchema = new Schema({
    subjectName:{
        type:String,
        required:true
    },
    subjectId:{
        type:String,
        required:true
    },
    semesterId:{
        type: Schema.Types.ObjectId,
        ref: 'semester',
        required:true
    },
    branchId:{
        type:Schema.Types.ObjectId,
        ref: 'branch',
        required:true
    }

    
  });
  module.exports=mongoose.model("subject",subjectSchema)