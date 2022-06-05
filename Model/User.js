var mongoose = require('mongoose');
const constant = require('../utility/constant');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: constant.ROLE
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true

  },
  contact: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  otp: {
    trim: true,
    type: String

  },
  // tokens: [{
  //   token: {
  //     type: String,
  //     // required: true
  //   }
  // }],
  wishList: [{
    type: Schema.Types.ObjectId,
    ref: 'topic',
    //required: true
  }],

},
  {
    timestamps: true
  });

UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
});


module.exports = mongoose.model("user", UserSchema)