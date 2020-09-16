'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MapSchema = new Schema({
    bank: {
        name: String,
        image: String,
        separatetype: Boolean,
        separatechar: String,
        rows: [{
            fields: [{
                fieldsname: String,
                fieldstype: String,
                fieldslength: Number,
                fieldsvalue: String,
                seq: Number,
                example: String,
                fieldsmapping: String,
            }]
        }]
    },
    source: {
        name: String,
        sourcetype: {
            type: String,
            enum: ["db","file"]
        },
        sourceDB: {
            DBtype: {
                type: String,
                enum: ["sql","oracle"]
            },
            host: String,
            user: String,
            password: String,
        },
        sourcefile: {
            filetype: {
                type: String,
                enum: ["excel","json"]
            },
            pathfile: String,
        },
        query: String,
        fields: {
            fieldsname: String,
            fieldtype: String,
        
        },
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
MapSchema.pre('save', function (next) {
    let Map = this;
    const model = mongoose.model("Map", MapSchema);
    if (Map.isNew) {
        // create
        next();
    } else {
        // update
        Map.updated = new Date();
        next();
    }


})
mongoose.model("Map", MapSchema);