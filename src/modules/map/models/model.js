'use strict';
const { isBoolean } = require('lodash');
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MapSchema = new Schema({
        name: String,
        image: String,
        dataset: {
            name: String,
            image: String,
            separatetype: Boolean,
            separatechar: String,
            rows: [
                {
                    fields: [
                        {
                            fieldname: String,
                            fieldtype: String,
                            fieldlength: Number,
                            defaultvalue: String,
                            seq: String,
                            example: String,
                            mapfield: String
                        },
                        {
                            fieldname: String,
                            fieldtype: String,
                            fieldlength: Number,
                            defaultvalue: String,
                            seq: String,
                            example: String,
                            mapfield: String
                        }
                    ]
                }
            ],
            encryptcmd: String,
            uploadcmd: String,
            maxamount: Number
        },
        datasource:{
            name: String,
            sourcetype: String,
            sourcedb: {
                dbtype: String,
                host: String,
                username: String,
                password: String
            },
            query: String,
            sourcefile: {
                filetype: String,
                filepath: String
            },
            fields: [
                {
                    fieldname: String,
                    fieldtype: String,
                    fieldlength: Number,
                    defaultvalue: String,
                    seq: String,
                    example: String
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