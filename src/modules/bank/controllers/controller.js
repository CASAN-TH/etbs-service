'use strict';
var mongoose = require('mongoose'),
    model = require('../models/model'),
    mq = require('../../core/controllers/rabbitmq'),
    Bank = mongoose.model('Bank'),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash');

const fs = require("fs");

let dataTxtfile = "";

exports.getList = function (req, res) {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query = {};
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    Bank.find({}, {}, query, function (err, datas) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: datas
            });
        };
    });
};

exports.create = function (req, res) {
    var newBank = new Bank(req.body);
    newBank.createby = req.user;
    newBank.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
            /**
             * Message Queue
             */
            // mq.publish('exchange', 'keymsg', JSON.stringify(newOrder));
        };
    });
};

exports.getByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: 400,
            message: 'Id is invalid'
        });
    }

    Bank.findById(id, function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.data = data ? data : {};
            next();
        };
    });
};

exports.read = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};

exports.update = function (req, res) {
    var updBank = _.extend(req.data, req.body);
    updBank.updated = new Date();
    updBank.updateby = req.user;
    updBank.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.delete = function (req, res) {
    req.data.remove(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

// exports.exampleTxtfile = function (req, res, next) {
//     next();
// }

// exports.modifyData = function (req, res) {
//     let bank = req.body;

//     bank.rows.forEach(row => {
//         switch (row.rowtype) {
//             case "header":
//                 modifyTxtfile(row.fields);
//                 break;
//             case "product":
//                 modifyTxtfile(row.fields);
//                 break;
//             case "transection":
//                 modifyTxtfile(row.fields);
//                 break;
//             case "footer":
//                 modifyTxtfile(row.fields);
//                 break;
//         }
//     })

//     var text = dataTxtfile;
//     res.setHeader('Content-type', "application/octet-stream");

//     res.setHeader('Content-disposition', 'attachment; filename=file.txt');

//     res.send(text);
// }

// modifyTxtfile = (fields) => {
//     console.log('modifyTxtfile');
//     let dataRow = "";
//     fields.forEach(field => {
//         switch (field.fieldtype) {
//             case "char":
//                 dataRow += `${field.example}`.padEnd(field.fieldlength, " ");
//                 break;
//             case "number":
//                 dataRow += `${field.example}`.padStart(field.fieldlength, "0");
//                 break;
//             case "date":
//                 dataRow += `${field.example}`.padStart(field.fieldlength, " ");
//                 break;
//             case "string":
//                 dataRow += `${field.example}`.padEnd(field.fieldlength, " ");
//                 break;
//             case "time":
//                 dataRow += `${field.example}`.padEnd(field.fieldlength, " ");
//                 break;
//             default:
//                 break;
//         }
//     })
//     dataTxtfile += data + '\n';
// }
