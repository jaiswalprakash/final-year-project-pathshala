const TopicModel = require('../Model/Topic');
const fs = require('fs');
const constant = require('../utility/constant');

const TopicDAO = {
    create: (bodyData) => {
        try {
            var today = new Date();
            let finalDate = today.getFullYear() + '/ ' + (today.getMonth() + 1) + '/ ' + today.getDate();
            new TopicModel({
                videoUrl: bodyData.video_Url,
                imageUrl: bodyData.image_Url,
                documentUrl: bodyData.document_Url,
                title: bodyData.title,
                subjectId: bodyData.subject_id,
                branchId: bodyData.branch_id,
                semesterId: bodyData.semester_id,
                UploadedDate: finalDate,
                rating: 0.0,
                teacherId: bodyData.teacherId,
                description: bodyData.description
            }).save();
            return { message: constant.MESSAGE.TOPIC.INSERTED, status: constant.HTML_STATUS_CODE.CREATED };
        } catch (error) {
            return { message: constant.MESSAGE.COMMON.INTERNAL_ERROR, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR }
        }

    },
    getTopicList: async (bodyData) => {

        data = await TopicModel.find({ teacherId: bodyData.teacherId }).
            populate({
                path: 'subjectId',
                select: { subjectName: 1, _id: 0 }
            }).populate({
                path: 'semesterId',
                select: { semesterName: 1, _id: 0 }
            }).populate({
                path: 'branchId',
                select: { branchName: 1, _id: 0 }
            });

        if (data) {
            return { message: constant.MESSAGE.TOPIC.SUCCESS, status: constant.HTML_STATUS_CODE.SUCCESS, code: data };

        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR }
        }

    },

    getTopicDetail: async (bodyData) => {
    // console.log("in topicdao ",bodyData._id);
        data = await TopicModel.find({ _id: bodyData._id }).
            populate({
                path: 'subjectId',
                select: { subjectName: 1, _id: 1 }
            }).populate({
                path: 'semesterId',
                select: { semesterName: 1, _id: 1 }
            }).populate({
                path: 'branchId',
                select: { branchName: 1, _id: 1 }
            })
            .populate({
                path: 'comments.userId',
                select: { name: 1 }
            }).sort({ comments: -1 });

            // console.log("data",data);
        if (data) {
            return { message: constant.MESSAGE.TOPIC.SUCCESS, status: constant.HTML_STATUS_CODE.SUCCESS, code: data };

        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR }
        }
    },
    // to get topic data according to branch selected by student 
    getTopic_Branch: async (bodyData) => {

        data = await TopicModel.find({ branchId: bodyData }).
            populate({
                path: 'subjectId',
                select: { subjectName: 1, _id: 0 }
            })
            .populate({
                path: 'semesterId',
                select: { semesterName: 1, _id: 0 }
            })
            .populate({
                path: 'branchId',
                select: { branchName: 1, _id: 0 }
            })
            .populate({
                path: 'teacherId',
                select: { name: 1, _id: 1 }
            }).populate({
                path: 'comments.$.reply.$.userId',
                select: { name: 1, _id: 1 }
            });
        if (data) {
            return { message: constant.MESSAGE.TOPIC.SUCCESS, status: constant.HTML_STATUS_CODE.SUCCESS, code: data };

        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR }
        }
    },
    recentAdded: async () => {
        data = await TopicModel.find({}).sort({ _id: -1 }).limit(8).
            populate({
                path: 'subjectId',
                select: { subjectName: 1, _id: 0 }
            }).populate({
                path: 'semesterId',
                select: { semesterName: 1, _id: 0 }
            }).populate({
                path: 'branchId',
                select: { branchName: 1, _id: 0 }
            })
            .populate({
                path: 'teacherId',
                select: { name: 1, _id: 1 }
            });
        if (data) {
            return { message: constant.MESSAGE.TOPIC.SUCCESS, status: constant.HTML_STATUS_CODE.SUCCESS, code: data };

        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR }
        }
    },

    postComment: async (bodyData) => {
        var today = new Date();
        let finalDate = today.getFullYear() + '/ ' + (today.getMonth() + 1) + '/ ' + today.getDate();
        data = await TopicModel.updateOne(
            { _id: bodyData.topic_id },
            {
                $push: {
                    comments: {
                        userId: bodyData.user_id,
                        text: bodyData.comment,
                        date: finalDate
                    }
                }
            });
        if (data.nModified >= 1) {
            return { message: constant.MESSAGE.TOPIC.COMMENT, status: constant.HTML_STATUS_CODE.CREATED};
        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.FAIL };
        }

    },
    commentReply: async (bodyData) => {
        var today = new Date();
        let finalDate = today.getFullYear() + '/ ' + (today.getMonth() + 1) + '/ ' + today.getDate();
        //console.log("commentReply",bodyData);
        data = await TopicModel.updateOne(
            { "_id": bodyData.topic_id, "comments._id": bodyData.comment_id },
            {
                $push: {
                    "comments.$.reply": {
                        userName: bodyData.user_name,
                        text: bodyData.comment,
                        date: finalDate
                    }
                }
            });
            if (data.nModified >= 1) {
                return { message: constant.MESSAGE.TOPIC.COMMENT, status: constant.HTML_STATUS_CODE.CREATED};
            } else {
                return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.FAIL };
            }
    },
    views: async (bodyData) => {
        data = await TopicModel.updateOne({ _id: bodyData.topic_id }, { $addToSet: { viewed: bodyData.userId } });
        if (data.nModified >= 1 ||data.ok===1) {
            return { message: constant.MESSAGE.TOPIC.INSERTED, status: constant.HTML_STATUS_CODE.SUCCESS };
        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.BAD_REQUEST };
        }
    },
    like: async (bodyData) => {
        data = await TopicModel.updateOne({ _id: bodyData.topic_id }, { $addToSet: { liked: bodyData.userId } })
        if (data.nModified >= 1 ||data.ok===1) {
            return { message: constant.MESSAGE.TOPIC.LIKED, status: constant.HTML_STATUS_CODE.SUCCESS,code:data };
        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.BAD_REQUEST };
        }
    },
    dislike: async (bodyData) => {
        data = await TopicModel.updateOne({ _id: bodyData.topic_id }, { $addToSet: { disliked: bodyData.userId } })
        if (data.nModified >= 1 ||data.ok===1 ) {
            return { message: constant.MESSAGE.TOPIC.DISLIKED, status: constant.HTML_STATUS_CODE.SUCCESS };
        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.BAD_REQUEST };
        }
    },
    Recommended_video: async (bodyData) => {
        let data = await TopicModel.find({ subjectId: bodyData.subjectId }).
            populate({
                path: 'subjectId',
                select: { subjectName: 1, _id: 1 }
            }).populate({
                path: 'semesterId',
                select: { semesterName: 1, _id: 1 }
            }).populate({
                path: 'branchId',
                select: { branchName: 1, _id: 1 }
            }).populate({
                path: 'teacherId',
                select: { name: 1, _id: 1 }
            });
        if (data) {
            return { message: constant.MESSAGE.TOPIC.SUCCESS, status: constant.HTML_STATUS_CODE.SUCCESS, code: data };

        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR}
        }
    },
    search: async (bodyData) => {
        let data = await TopicModel.find({ $text: { $search: bodyData } }).sort({ UploadedDate: -1 }).
            populate({
                path: 'subjectId',
                select: { subjectName: 1, _id: 1 }
            }).populate({
                path: 'semesterId',
                select: { semesterName: 1, _id: 1 }
            }).populate({
                path: 'branchId',
                select: { branchName: 1, _id: 1 }
            }).populate({
                path: 'teacherId',
                select: { name: 1, _id: 1 }
            });
           // console.log(data);
        if (data) {
            return { message: constant.MESSAGE.TOPIC.SUCCESS, status: constant.HTML_STATUS_CODE.SUCCESS, code: data };

        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR}
        }
    },
    totalVideo: async () => {
        let data = await TopicModel.find({}).count();
        if (data) {
            return { message: constant.MESSAGE.TOPIC.SUCCESS, status: constant.HTML_STATUS_CODE.SUCCESS, code: data };

        } else {
            return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR}
        }
    },
    removeTopic: async (bodyData) => {
        // let data = await TopicModel.findOne({"_id":bodyData.topic_id});
        // let videoUrl1= data["videoUrl"].replace('\\' ,'/');
        // let videoUrl=videoUrl1.replace('\\' ,'/');
        // const path1 = `../views${videoUrl}`;
        // console.log("path1",path1)
        //     try {
        //             fs.unlinkSync(path1)
        //             //file removed
        //             console.log("removed")
        //     } catch(err) {
        //         console.error(err)
        //         }
        // const path1 = `../views/document/${bodyData.videoUrl}`;

            let data = await TopicModel.deleteOne({"_id":bodyData.topic_id});
            if (data) {
                
                return { message: constant.MESSAGE.TOPIC.DELETE, status: constant.HTML_STATUS_CODE.SUCCESS, code: data };
    
            } else {
                return { message: constant.MESSAGE.TOPIC.FAIL, status: constant.HTML_STATUS_CODE.INTERNAL_ERROR}
            }
    },

}
module.exports = TopicDAO;