'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BankSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Bank name',
    },
    image:String,
    separatetype:Boolean,
    saparatechar:String,
    rows: [{
        fields: [{
            fieldname: String,
            fieldtype: String,
            fieldlength: Number,
            defaultvalue: String,
            seq: Number,
            example: String,
        }],
    }],
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
BankSchema.pre('save', function(next){
    let Bank = this;
    const model = mongoose.model("Bank", BankSchema);
    if (Bank.isNew) {
        // create
        next();
    }else{
        // update
        Bank.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Bank", BankSchema);