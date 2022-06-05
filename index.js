const express = require('express');// get the express
var mongoose = require('mongoose'); // get the mongoose after npm i mongoose
const dbDumpDAO = require('./DAO/db-dumpDAO');
const app = express();
const path = require('path'); // for showing the html 
const multer = require('multer');// for uploading file to disk 
const bcryptjs = require('bcryptjs'); // for encrypting password 
var nodemailer = require('nodemailer'); // nodemailer is an npm package to send mail
var validator = require('validator'); // for validation


////------------storage for multer file -----------------/////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/document')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
});
const upload = multer(
    {
        storage: storage,
    },

);

////---------- fileUpload api---------------------------//// 

app.post('/fileUpload', upload.single('file'), function (req, res, next) {

    var fileInfo = req.file;
    res.send(fileInfo);
})

//----------------bodyParser for post---------------//

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// -------connection for database-----------//
const mongoDB = 'mongodb://localhost/mooc';  
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Mongodb connected successfully');
});
function close(){
    return mongoose.disconnect();
}

app.use(express.static(path.join(__dirname, 'views')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');// to project the views folder

//  --------------routing-----------------------//

// app.use((req,res,next)=>{
// res.status(503).send("site is currently down .check back soon!");
// });


app.use('/user', require('./router/user-router'));
app.use('/student', require('./router/student-router'));
app.use('/topic', require('./router/Topic-router'));
app.use('/teacher', require('./router/teacher-router'));
app.use('/branch', require('./router/db-dump-router'));
app.use('/semester', require('./router/db-dump-router'));
app.use('/subject', require('./router/db-dump-router'));

app.use(dbDumpDAO.create(), function () {
    console.log('Dump Created Successfully');
});




// ----------- defining port number------------
app.listen(3000, () => {
    console.log("listening to the port 3000")
});

module.exports = app



