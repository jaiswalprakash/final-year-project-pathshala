const studentModel = require('../Model/student');
const UserModel = require('../Model/User');
const userDAO = require('./userDAO');
const constant = require('../utility/constant')
const studentDAO = {
    create: async (bodyData) => {
        let data = await UserModel.find({ email: bodyData.email });
        if (data && data.length > 0) {
            return { message: constant.MESSAGE.COMMON.EMAIL_TAKEN, status: constant.HTML_STATUS_CODE.CONFLICT };
        }
        else {
            try {
                bodyData['role'] = 'STUDENT';
                let userCreated = await userDAO.create(bodyData); // for creating the user collection 
                if (userCreated) {
                    // console.log('userCreated' + userCreated);
                    let data =  await new studentModel({
                        name: bodyData.name,
                        studentId: ('STU' + Math.floor(Math.random() * 1000)),
                        branchId: bodyData.branch,
                        usn: bodyData.usn,
                        userId: userCreated._id
                    }).save();
                    // console.log("student data",data);
                    if(data)
                        return { status: constant.HTML_STATUS_CODE.CREATED, message: constant.MESSAGE.STUDENT.CREATED }
                    else
                        return { message: constant.MESSAGE.COMMON.INTERNAL_ERROR, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR }
                }
            } catch (error) {
                return { status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR }
            }
        }
    },
    getDetail: async (bodyData) => {
        //console.log(bodyData);
        try {
            let data = await studentModel.find({ userId: bodyData }).
                populate({
                    path: 'branchId',
                    select: { branchName: 1 }
                })
            return data;

        } catch (error) {
            return { status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR }
        }

    },
}

module.exports = studentDAO;