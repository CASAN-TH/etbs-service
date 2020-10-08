'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MapSchema = new Schema({
    map: {
        mapname: String,
        mapimage: String,
        mapseparatetype: Boolean,
        mapseparatechar: String,
        mapfields: String,
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