const express = require('express');
const route = express.Router();
const UserDAO = require('../DAO/userDAO');
const constant = require('../utility/constant');


//--------------------login APi----------------------------// 

route.post('/login', async function (req, res) {
    try {
        let data = await UserDAO.login(req.body);
        // const token = await UserDAO.generateAuthToken(data)
        if (data) {
            // res.status(200).send({data,token});
            res.status(200).send(data);
        } else {
            res.status(404).send('error');
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }
});

// ----------forget password API ---------------//

route.post('/forgot', async function (req, res) {
    
   try {
        let data = await UserDAO.forgot(req.body);
        if (data) {
            res.status(data.status).send(data);
        } else {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});

//-------------------updatePassword API -----------------------//

route.post('/updatePassword', async function (req, res) {

    try {
        let data = await UserDAO.updatePassword(req.body);
        if (data) {
            res.status(data.status).send(data);
        } else {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});



//---------------updateProfile API --------//
route.post('/updateProfile', async function (req, res) {

    let data = await UserDAO.updatePassword(req.body);
    if (data) {
        res.send('password  updated ')

    } else {
        res.send('Error');
    }
});


route.post('/wishList', async function (req, res) {
    let data = await UserDAO.wishList(req.body);
    if (data) {
        res.send(data);
    }
    else {
        req.send('error');
    }

});
route.get('/getWishlist/:', async function (req, res) {
    let data = await UserDAO.getWishlist(req.params);
    if (data) {
        res.send(data);
    } else {
        req.send('error');
    }
})

module.exports = route;
