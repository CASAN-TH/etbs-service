'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BankSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Bank name',
    },
    image: {
        type: String,
        // required: 'Please fill a Bank image',
    },
    separatetype: {
        type: Boolean,
        required: 'Please fill a Bank separatetype',
    },
    separatechar: {
        type: String,
        // required: 'Please fill a Bank separatechar',
    },
    rows: {
        type: [
            {
                rowname: {
                    type: String,
                },
                rowtype: {
                    type: String,
                },
                required: {
                    type: Boolean,
                },
                fields: {
                    type: [
                        {
                            fieldname: {
                                type: String,
                            },
                            fieldtype: {
                                type: String,
                            },
                            fieldlength: {
                                type: Number,
                            },
                            required: {
                                type: Boolean,
                            },
                            defaultvalue: {
                                type: String,
                            },
                            seq: {
                                type: Number,
                            },
                            example: {
                                type: String,
                            },
                        }
                    ]
                },
            }
        ]
    },
    encrypt: {
        type: Boolean
    },
    upload: {
        type: Boolean
    },
    limitamount: {
        type: Boolean
    },
    encryptcmd: {
        type: String,
        // required: 'Please fill a Bank encryptcmd',
    },
    uploadcmd: {
        type: String,
        // required: 'Please fill a Bank uploadcmd',
    },
    maxamount: {
        type: Number,
        // required: 'Please fill a Bank maxamount',
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
BankSchema.pre('save', function (next) {
    let Bank = this;
    const model = mongoose.model("Bank", BankSchema);
    if (Bank.isNew) {
        // create
        next();
    } else {
        // update
        Bank.updated = new Date();
        next();
    }


})
mongoose.model("Bank", BankSchema);