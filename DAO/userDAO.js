const UserModel = require('../Model/User');
const studentModel = require('../Model/student');
const teacherModel = require('../Model/teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constant = require('../utility/constant');
let NodeCache = require("node-cache");
const sgMail = require('@sendgrid/mail');
const sendGridAPIKey = "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";
sgMail.setApiKey(sendGridAPIKey);

var myCache = new NodeCache({ deleteOnExpire: true });

const UserDAO = {

    create: (bodyData, role) => {
        return new UserModel({
            name: bodyData.name,
            role: bodyData.role, // i need to take this give this value automatically
            email: bodyData.email,
            password: bodyData.password,
            contact: bodyData.phone,
            userId: ('US' + Math.floor(Math.random() * 1000)),
            otp: 'otp123',
        }).save();
    },
    login: async function (bodyData) {
        let data = await UserModel.findOne({ email: bodyData.email });
        if (!data) {
            let code = {
                role: " "
            }
            return { message: constant.MESSAGE.LOGIN.EMAIL_NOT_VALID, status: constant.HTML_STATUS_CODE.INVALID_DATA, code: code }
        };

        const isMatch = await bcrypt.compare(bodyData.password, data.password);

        if (!isMatch) {
            let code = {
                role: " "
            }
            return { message: constant.MESSAGE.LOGIN.WRONG_PASSWORD, status: constant.HTML_STATUS_CODE.INVALID_DATA, code: code }
        }
        else {
            if (data && data.role == 'STUDENT') {
                let userId = data._id;
                let studentData = await studentModel.findOne({ userId: userId }).populate({
                    path: 'branchId',
                    select: { branchName: 1, _id: 1 }
                });
                let code = {
                    userId: userId,
                    role: data.role,
                    branchId: studentData.branchId._id,
                    branchName: studentData.branchId.branchName,
                    name: studentData.name
                }
                return { message: constant.MESSAGE.LOGIN.SUCCESS, status: constant.HTML_STATUS_CODE.SUCCESS, code: code };
            }
            if (data && data.role == 'TEACHER') {
                let userId = data._id;
                let teacherData = await teacherModel.findOne({ userId: userId })
                let code = {
                    userId: userId,
                    role: data.role,
                    name: teacherData.name,
                    teacherId: teacherData._id
                }
                return { message: constant.MESSAGE.LOGIN.SUCCESS, status: constant.HTML_STATUS_CODE.SUCCESS, code: code };
            }
            else return false;
        }
    },
    // generateAuthToken:async function(bodyData){
    //     const user =bodyData;
    //     const token =jwt.sign({_id:user.userId.toString()},'thisIsNewUser');
    //     console.log(token);

    //     // UserModel.tokens=UserModel.tokens.concat({token:token});
    //     //await UserModel.save();

    //     return token;

    // },
    forgot: async function (bodyData) {
        var data = await UserModel.find({ email: bodyData.email })
        let sendOtp = Math.floor(Math.random() * 1000000); // create otp 
        console.log("sendOtp",sendOtp);

        if (data.length > 0) {
            myCache.set("otp", sendOtp, 20000);
            console.log("key" +  JSON.stringify(myCache.get( "otp" ))   + "value");
            await UserModel.updateOne({ email: bodyData.email }, { $set: { otp: sendOtp } });
            sgMail.send({
                to: bodyData.email,
                from: 'prakashjaiswal625@gmail.com',
                subject: "OTP to recover Password",
                text: 
                `Hi,
                This is the otp for the forgot password.Please enter the otp  to recover or change password  ${sendOtp}
                This otp is valid for Two minutes.
                If any problem please contact your customer care.
                                                               Thanking you 
                                                              Team Pathshala `
                         
            }).then(() => {
                return { message: constant.MESSAGE.LOGIN.EMAIL_SUCCESS, status: constant.HTML_STATUS_CODE.SUCCESS };
            })
            .catch((error) => {
                return { message: constant.MESSAGE.COMMON.INTERNAL_ERROR, status: constant.HTML_STATUS_CODE.UNAUTHORIZED };
            });
            
        }
        else {
            return { message: constant.MESSAGE.LOGIN.EMAIL_NOT_VALID, status: constant.HTML_STATUS_CODE.UNAUTHORIZED };
        }
    },
    updatePassword: async function (bodyData) {
        console.log('updatePassword',bodyData);
        try {
        if (bodyData.otp === JSON.stringify(myCache.get( "otp" ))) {
            let password = await bcrypt.hash(bodyData.newPassword, 8);
            let data = await UserModel.updateOne({ otp: bodyData.otp }, { $set: { password } });
            console.log("updatePassworddata",data);
            if (data.nModified === 1) {
                return { message: constant.MESSAGE.LOGIN.PASSWORD_CHANGED, status: constant.HTML_STATUS_CODE.SUCCESS };
            } else {
                return { message: constant.MESSAGE.LOGIN.PASSWORD_CHG_FAILED, status: constant.HTML_STATUS_CODE.BAD_REQUEST };
            }
        }
        else {
            return { message: constant.MESSAGE.LOGIN.PASSWORD_CHG_FAILED, status: constant.HTML_STATUS_CODE.INVALID_DATA }
        }
        } catch (error) {
            res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
        }

    },
    wishList: async (bodyData) => {
        data = await UserModel.updateOne({ _id: bodyData.userId }, { $addToSet: { wishList: bodyData.topicId } });
        if (data) {
            return true;
        }
    },
    getWishList: async (bodyData) => {

    }

}
module.exports = UserDAO;
