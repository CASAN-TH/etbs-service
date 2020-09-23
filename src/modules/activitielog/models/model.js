'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ActivitielogSchema = new Schema({


    hospitalname: {
        type: String,
        required: 'Please fill a Activitielog hospitalname',
    },
    mapings: {
        type: [
            {
                mapname: {
                    type: String,
                    required: 'Please fill a Activitielog mapname',
                },
                systems: {
                    type: [
                        {
                            systemname: {
                                type: String,
                                required: 'Please fill a Activitielog systemname',
                            },
                            status: {
                                type: Boolean,
                                required: 'Please fill a Activitielog status',
                            },
                            systemlog: {
                                type: String,
                                required: 'Please fill a Activitielog systemlog',
                            },
                        }
                    ]
                },
            }
        ]
    },


    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});
ActivitielogSchema.pre('save', function (next) {
    let Activitielog = this;
    const model = mongoose.model("Activitielog", ActivitielogSchema);
    if (Activitielog.isNew) {
        // create
        next();
    } else {
        // update
        Activitielog.updated = new Date();
        next();
    }


})
mongoose.model("Activitielog", ActivitielogSchema);