'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SourceSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Source name',
    },
    sourcetype: {
        type: String,
        enum: ["db", "file"],
    },
    sourcedb: {
        dbtype: {
            type: String,
            // enum: ["sql", "oracle"],
        },
        host: {
            type: String,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        }
    },
    sourcefile: {
        filetype: {
            type: String,
            // enum: ["excel", "JSON"],
        },
        filepath: {
            type: String,
        }
    },
    query: {
        type: String,
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
SourceSchema.pre('save', function (next) {
    let Source = this;
    const model = mongoose.model("Source", SourceSchema);
    if (Source.isNew) {
        // create
        next();
    } else {
        // update
        Source.updated = new Date();
        next();
    }


})
mongoose.model("Source", SourceSchema);