const express = require('express');
const route = express.Router();
const teacherDAO = require('../DAO/teacherDAO');
const constant = require('../utility/constant');
const response = require('../utility/custom-response');
// const isAuthenticate = require('../authenticate');

route.post('/signUp', async function (req, res) {
    try {
        let data = await teacherDAO.create(req.body);
        //const token = await UserDAO.generateAuthToken(data);
        if (data)
            res.status(data.status).send(data);
           
        else
            res.status(constant.HTML_STATUS_CODE.NOT_FOUND).send({ message: constant.MESSAGE.COMMON, status: constant.HTML_STATUS_CODE.NOT_FOUND });

    } catch (error) {
        res.status(data.status).send(data);
    }

});


route.get('/getDetail/:id', async function (req, res) {

    let data = await teacherDAO.getDetail(req.params.id);
    if (data)
        res.send({ message: "data fetch successfully", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });
    else
        res.send({ message: "something went wrong", status: constant.HTML_STATUS_CODE.NOT_FOUND, code: data });

});

route.get('/teacherInfo/:teacherInfoId', async function (req, res) {
    
    let data = await teacherDAO.teacherInfo(req.params.teacherInfoId);
    if (data) 
        res.send({ message: "data fetch successfully", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });
        else
            res.send({ message: "something went wrong", status: constant.HTML_STATUS_CODE.NOT_FOUND, code: data });
    
});

module.exports = route;