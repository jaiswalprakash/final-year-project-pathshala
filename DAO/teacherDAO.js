const teacherModel = require('../Model/teacher');
const UserModel = require('../Model/User');
const userDAO = require('./userDAO');
const constant = require('../utility/constant');
const teacherDAO = {

    create: async (bodyData) => {
        let data = await UserModel.find({ email: bodyData.email });
        if (data && data.length > 0) {
            return { message: constant.MESSAGE.COMMON.EMAIL_TAKEN, status: constant.HTML_STATUS_CODE.CONFLICT };
        }
        else {
             try {
                bodyData['role'] = 'TEACHER';
                let userCreated = await userDAO.create(bodyData);
                if (userCreated) {
                    // console.log('userCreated' + userCreated);
                   let data= new teacherModel({
                        name: bodyData.name,
                        designation: bodyData.designation,
                        description: bodyData.description,
                        teacherId: ('TEA' + Math.floor(Math.random() * 1000)),
                        userId: userCreated._id
                    }).save();
                    if(data)
                    return { status: constant.HTML_STATUS_CODE.CREATED, message: constant.MESSAGE.TEACHER.CREATED }
                    else
                    return { message: constant.MESSAGE.COMMON.INTERNAL_ERROR, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR }
                }

            } catch (error) {
                return { message: constant.MESSAGE.COMMON.INTERNAL_ERROR, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR }
            }
        }

    },
    getDetail: async (bodyData) => {
        try {
            // console.log(bodyData);
            return teacherModel.find({ userId: bodyData }).
                populate({
                    path: 'branchId',
                    select: { branchName: 1 }
                })
        } catch (error) {
            return { status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR }
        }

    },
    teacherInfo: async (bodyData) => {
        try {
            return teacherModel.find({ _id: bodyData }).
                populate({
                    path: 'userId',
                    select: { email: 1 }
                });
        } catch (error) {
            return { status: constant.HTML_STATUS_CODE.INTERNAL_ERROR, message: constant.MESSAGE.COMMON.INTERNAL_ERROR }
        }

    },

}
module.exports = teacherDAO;