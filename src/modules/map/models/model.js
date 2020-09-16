'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MapSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Map name',
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
MapSchema.pre('save', function(next){
    let Map = this;
    const model = mongoose.model("Map", MapSchema);
    if (Map.isNew) {
        // create
        next();
    }else{
        // update
        Map.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Map", MapSchema);