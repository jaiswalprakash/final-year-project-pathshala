const express = require('express');
const route = express.Router();
const TopicDAO = require('../DAO/TopicDAO');
const constant = require('../utility/constant');
// const isAuthenticate = require('../authenticate');


////--------------to upload video to our website------------------------------------////

route.post('/insertDocument', async function (req, res) {
    try {
        let data = await TopicDAO.create(req.body);
        if (data) {
            res.status(data.status).send(data);
        } else {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});

////------------------to get video doc according to teacherID ie on basis of teacher----------------------////

route.post('/getTopicList', async function (req, res) {
    try {
        let data = await TopicDAO.getTopicList(req.body);
        if (data) {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});
////-------------to get all the details of specific document(video)-----------------------------------------////

route.post('/getTopicDetail', async function (req, res) {

    try {
        let data = await TopicDAO.getTopicDetail(req.body);
        if (data) {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});

////---------------------------------to comment of topic-----------------------------------------------------////

route.post('/postComment', async function (req, res) {

    try {
        let data = await TopicDAO.postComment(req.body);
        if (data) {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }
});

////------------------------------- to reply to specific comment------------------------------------------------////

route.post('/commentReply', async function (req, res) {

    try {
        let data = await TopicDAO.commentReply(req.body);
        if (data) {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }
});

////----------------not required as per_now------to retrieve all the comment posted on particular topic------------///

route.post('/getComment', async function (req, res) {
    let data = await TopicDAO.getComment(req.body);
    if (data) {
        res.send(data);

    } else {

        res.status(401).send({ error: 'no data found' });

    }
});

////-------------------------- to get topic data according to branch (selected by student) -------------------////

route.get('/getTopic_Branch/:branch_id', async function (req, res) {

    try {
        let data = await TopicDAO.getTopic_Branch(req.params.branch_id);
        if (data) {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});

////---------------------------------------- recentAddad video------------------------------------------------////

route.get('/recentAdded', async function (req, res) {

    try {
        let data = await TopicDAO.recentAdded();
        if (data) {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }
});

////--------------------to update view field in topic model------------------------////

route.post('/view', async function (req, res) {

    try {
        let data = await TopicDAO.views(req.body);
        if (data) {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }
});

////--------------------to update like field in topic model------------------------////

route.post('/like', async function (req, res) {

    try {
        let data = await TopicDAO.like(req.body);
        if (data) {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});
////--------------------to update dislike field in topic model------------------------////

route.post('/dislike', async function (req, res) {

    try {
        let data = await TopicDAO.dislike(req.body);
        if (data) {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});

////-----------------------------------according to subjectID-------------------////

route.post('/Recommended_video', async function (req, res) {

    try {
        let data = await TopicDAO.Recommended_video(req.body);
        if (data) {
            res.status(data.status).send(data);
        } else {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});

////--------------------------search of video based on title--------------------////

route.get('/search/:searchText', async function (req, res) {
    
    try {
        let data = await TopicDAO.search(req.params.searchText);
        if (data) {
            res.status(data.status).send(data);
        } else {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});

////---------------------to get total number of topic in topic model-----------------------------------////

route.get('/totalVideo', async function (req, res) {
    
     try {
        let data = await TopicDAO.totalVideo();
        if (data) {
            res.status(data.status).send(data);
        } else {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }

});

////-------------------------to remove video from topic model--------------------------------------------------////

route.post('/removeTopic', async function (req, res) {
    try {
        let data = await TopicDAO.removeTopic(req.body);
        if (data) {
            res.status(data.status).send(data);
        } else {
            res.status(data.status).send(data);
        }
    } catch (error) {
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).send(constant.MESSAGE.COMMON.INTERNAL_ERROR);
    }
})



module.exports = route;