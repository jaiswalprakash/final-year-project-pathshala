const express = require('express');
const route = express.Router();
const dbDumpDAO = require('../DAO/db-dumpDAO');
const constant = require('../utility/constant');
// const isAuthenticate = require('../authenticate');

////--------------get branch list-------------/////////

route.get('/getBranchList', async function (req, res) {

    let data = await dbDumpDAO.getBranchList();
    if (data)
        res.send({ message: "Data fetch successfully", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });

    else
        res.send({ message: constant.MESSAGE.COMMON, status: constant.HTML_STATUS_CODE.NOT_FOUND, code: data });

});
////---------------- separate branch create API-----------------------/////

route.post('/separateBranchCreate', async function (req, res) {

    let data = await dbDumpDAO.separateBranchCreate(req.body);
    if (data)
        res.send({ message: "branch created", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });

    else
        res.send({ message: constant.MESSAGE.COMMON, status: constant.HTML_STATUS_CODE.NOT_FOUND, code: data });

});
////------------  branch  delete API-----------------////

route.post('/branchDelete', async function (req, res) {
    let data = await dbDumpDAO.branchDelete(req.body);
    if (data.length > 0)
        res.send({ message: "BAD_REQUEST branch not delete  ", status: constant.HTML_STATUS_CODE.BAD_REQUEST, code: data });

    else
        res.send({ message: "branch deleted", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });

});

////--------------get semester list----------------////

route.get('/getSemesterList', async function (req, res) {

    let data = await dbDumpDAO.getSemesterList();
    if (data)
        res.send({ message: "Data fetch successfully", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });

    else
        res.send({ message: constant.MESSAGE.COMMON, status: constant.HTML_STATUS_CODE.NOT_FOUND, code: data });

});

////---------------- separate semester create API-----------------------/////
route.post('/separateSemesterCreate', async function (req, res) {

    let data = await dbDumpDAO.separateSemesterCreate(req.body);

    if (data)
        res.send({ message: "semester created", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });

    else
        res.send({ message: constant.MESSAGE.COMMON, status: constant.HTML_STATUS_CODE.NOT_FOUND, code: data });

});

////-------------semester Delete API----------------////

route.post('/semesterDelete', async function (req, res) {

    let data = await dbDumpDAO.semesterDelete(req.body);
    if (data.length > 0)
        res.send({ message: "BAD_REQUEST semester not delete  ", status: constant.HTML_STATUS_CODE.BAD_REQUEST, code: data });

    else
        res.send({ message: "semester deleted", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });

});
////---------------- get subject list------------------///
route.post('/getSubjectList', async function (req, res) {

    let data = await dbDumpDAO.getSubjectList(req.body);
    if (data)
        res.send({ message: "Data fetch successfully", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });

    else
        res.send({ message: constant.MESSAGE.COMMON, status: constant.HTML_STATUS_CODE.NOT_FOUND, code: data });

});


////---------------- separate subject create API-----------------------/////
route.post('/separateSubjectCreate', async function (req, res) {

    let data = await dbDumpDAO.separateSubjectCreate(req.body);
    if (data)
        res.send({ message: "subject created", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });
    else
        res.send({ message: constant.MESSAGE.COMMON, status: constant.HTML_STATUS_CODE.NOT_FOUND, code: data });

});


////-------------subject Delete API----------------////

route.post('/subjectDelete', async function (req, res) {
    let data = await dbDumpDAO.subjectDelete(req.body);
    if (data.length > 0)
        res.send({ message: "BAD_REQUEST subject not delete  ", status: constant.HTML_STATUS_CODE.BAD_REQUEST, code: data });

    else
        res.send({ message: "subject deleted", status: constant.HTML_STATUS_CODE.SUCCESS, code: data });

});

////------------- filter by branch-------------------//// 




module.exports = route;
