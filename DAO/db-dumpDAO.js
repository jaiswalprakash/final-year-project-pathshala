const branchModel = require('../Model/branch');
const semesterModel = require('../Model/semester');
const constant = require('../utility/constant');
const subjectModel = require('../Model/subject');

const mongoose = require('mongoose');
const objectID = mongoose.Types.ObjectId;
const dbDumpDAO = {
    create: async function () {
        try {
            let checkBranch = await branchModel.find({});
            if (checkBranch && checkBranch.length > 0) {
            }
            else {
                let branchData = constant.BRANCH;
                for (let br of branchData) {
                    let data = await new branchModel({
                        branchName: br,
                        branchId: ('BR' + Math.floor(Math.random() * 1000))
                    }).save();
                    console.log('done');
                }
                console.log('finished');
            }
            //--------------------------SEMESTER-----------------------------------//

            let checkSemester = await semesterModel.find({});
            if (checkSemester && checkSemester.length > 0) {

            }
            else {
                let semesterData = constant.SEMESTER;
                for (let sm of semesterData) {
                    let data = await new semesterModel({
                        semesterName: sm,
                        semesterId: ('SM' + Math.floor(Math.random() * 1000))

                    }).save();
                    console.log('done');
                }
                console.log('finished');
            }
            ////---------------SUBJECT---------------------------------////
            let semList = await semesterModel.find({});
            let branchList = await branchModel.find({});
            let subjectList = await subjectModel.find({});
            let subjectData = constant.SUBJECT;

            if (subjectList && subjectList.length > 0) {

            }
            else {

                for (let sub of subjectData) {
                    let data = await new subjectModel({
                        subjectName: sub.name,
                        subjectId: ('SUB' + Math.floor(Math.random() * 1000)),
                        semesterId: (semList.find(item => item.semesterName == sub.semester))._id,
                        branchId: (branchList.find(item => item.branchName == sub.branch))._id,

                    }).save();
                }
            }

            return true;
        }
        catch (error) {

        }
    },
    ////--------- get semester branch subject list ------------------////

    getBranchList: () => {
        return branchModel.find({}, { branchName: 1, branchId: 1, });
    },
    getSemesterList: () => {
        return semesterModel.find({}, { semesterName: 1, semesterId: 1, });
    },
    getSubjectList: (bodyData) => {
        return subjectModel.find({ branchId: bodyData.branch_id, semesterId: bodyData.semester_id }, { subjectName: 1 });
    },
    //----------------separate branch , semester, subject  create API------------//

    separateBranchCreate: (bodyData) => {
        branchModel.insertMany({ branchName: bodyData.branchName, branchId: ('BR' + Math.floor(Math.random() * 1000)) });
        return branchModel.find({ branchName: bodyData.branchName });
    },
    separateSemesterCreate: (bodyData) => {
        semesterModel.insertMany({ semesterName: bodyData.semesterName, semesterId: ('SM' + Math.floor(Math.random() * 1000)) });
        return semesterModel.find({ semesterName: bodyData.semesterName });
    },
    separateSubjectCreate: (bodyData) => {
        subjectModel.insertMany({ subjectName: bodyData.subjectName, subjectId: ('SUB' + Math.floor(Math.random() * 1000)), semesterId: bodyData.semesterId, branchId: bodyData.branchId });
        return subjectModel.find({ subjectName: bodyData.subjectName });
    },
    ////----------------------branch , semester , subject delete API----------------------////
    branchDelete: async (bodyData) => {
        await branchModel.deleteOne({branchId: bodyData.branchId });
        await subjectModel.deleteMany({ branchId: bodyData.branchId });
        return  branchModel.find({ branchId:bodyData.branchId });
    },
    semesterDelete: async (bodyData) => {
       await semesterModel.deleteOne({ semesterId: bodyData.semesterId });
        await subjectModel.deleteMany({ semesterId: bodyData.semesterId });
        return   semesterModel.find({ semesterId: bodyData.semesterId });

    },
    subjectDelete: (bodyData) => {
        subjectModel.deleteOne({ subjectId: bodyData.subjectId })
        return subjectModel.find({ subjectId: bodyData.subjectId })
    },


}
module.exports = dbDumpDAO;
