var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TopicSchema = new Schema({
    videoUrl: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    documentUrl: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        required: true
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'subject',
        required: true
    },
    UploadedDate: {
        type: String,
        default: 0
    },
    viewed: [{
        type: Schema.Types.ObjectId,
        ref: 'user',

    }],
    rating: {
        type: Number,
        default: 0
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'teacher',
        required: true
    },
    semesterId: {
        type: Schema.Types.ObjectId,
        ref: 'semester',
        required: true
    },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: 'branch',
        required: true
    },
    comments: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        text: {
            type: String,
        },
        date: {
            type: String
        },
        reply:[{
            userName: {
                type: String,
                required:true
            },
            text: {
                type: String,
            },
            date: {
                type: String
            },
        }]

    }],
    description: {
        type: String,
        default: ""
    },
    liked: [{
        type: Schema.Types.ObjectId,
        ref: 'user',

    }],
    disliked: [{
        type: Schema.Types.ObjectId,
        ref: 'user',

    }],
});
TopicSchema.index({title: 'text'});
module.exports = mongoose.model("Topic", TopicSchema)



