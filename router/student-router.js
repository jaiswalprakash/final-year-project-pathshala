const express = require('express');
const route = express.Router();
const StudentDAO = require('../DAO/studentDAO');
const UserDAO = require('../DAO/userDAO');
const constant = require('../utility/constant');
const response = require('../utility/custom-response');


////-----------------------------signup API for student----------------------------------------------////

route.post('/signUp', async function (req, res) {

    try {
        let data = await StudentDAO.create(req.body);
        //const token = await UserDAO.generateAuthToken(data);
        if(data){
            res.status(200).send(data);
        }
        else
            res.status(constant.HTML_STATUS_CODE.NOT_FOUND).send({ message: constant.MESSAGE.COMMON, status: constant.HTML_STATUS_CODE.NOT_FOUND });

    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.NOT_FOUND).send({ message: constant.MESSAGE.COMMON, status: constant.HTML_STATUS_CODE.NOT_FOUND });
    }

});

////-----------------------------getDetail API for student----------------------------------------------////

route.get('/getDetail/:id', async function (req, res) {
    let data = await StudentDAO.getDetail(req.params.id);
    if (data && data.length > 0)
        res.send({ message: "data fetch successfully", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });
    else
        res.send({ message: "something went wrong", status: constant.HTML_STATUS_CODE.NOT_FOUND, code: data });

});

module.exports = route;