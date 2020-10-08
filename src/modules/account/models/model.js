'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AccountSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Account name',
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
AccountSchema.pre('save', function(next){
    let Account = this;
    const model = mongoose.model("Account", AccountSchema);
    if (Account.isNew) {
        // create
        next();
    }else{
        // update
        Account.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Account", AccountSchema);