'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Bank = mongoose.model('Bank');

var credentials,
    token,
    mockup;

describe('Bank CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: 'bay',
            image: 'http://',
            separatetype: false,
            separatechar: 'aaa',
            rows: [{
                rowname: "001",
                rowtype: "header",
                required: true,
                fields: [{
                    fieldname: 'Name',
                    fieldtype: 'String',
                    fieldlength: 50,
                    required: false,
                    defaultvalue: '',
                    seq: 1,
                    example: 'Pleum',
                }],
            }],
            encrypt: false,
            upload: false,
            limitamount: false,
            encryptcmd: 'encryptCmd',
            uploadcmd: 'uploadCmd',
            maxamount: 200
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Bank get use token', (done) => {
        request(app)
            .get('/api/banks')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Bank get by id', function (done) {

        request(app)
            .post('/api/banks')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/banks/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }


                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.image, mockup.image);
                        assert.equal(resp.data.separatetype, mockup.separatetype);
                        assert.equal(resp.data.separatechar, mockup.separatechar);

                        assert.equal(resp.data.rows[0].rowname, mockup.rows[0].rowname);
                        assert.equal(resp.data.rows[0].rowtype, mockup.rows[0].rowtype);
                        assert.equal(resp.data.rows[0].required, mockup.rows[0].required);

                        assert.equal(resp.data.rows[0].fields[0].fieldname, mockup.rows[0].fields[0].fieldname);
                        assert.equal(resp.data.rows[0].fields[0].fieldtype, mockup.rows[0].fields[0].fieldtype);
                        assert.equal(resp.data.rows[0].fields[0].fieldlength, mockup.rows[0].fields[0].fieldlength);
                        assert.equal(resp.data.rows[0].fields[0].required, mockup.rows[0].fields[0].required);
                        assert.equal(resp.data.rows[0].fields[0].defaultvalue, mockup.rows[0].fields[0].defaultvalue);
                        assert.equal(resp.data.rows[0].fields[0].seq, mockup.rows[0].fields[0].seq);
                        assert.equal(resp.data.rows[0].fields[0].example, mockup.rows[0].fields[0].example);

                        assert.equal(resp.data.encrypt, mockup.encrypt);
                        assert.equal(resp.data.upload, mockup.upload);
                        assert.equal(resp.data.limitamount, mockup.limitamount);

                        assert.equal(resp.data.encryptcmd, mockup.encryptcmd);
                        assert.equal(resp.data.uploadcmd, mockup.uploadcmd);
                        assert.equal(resp.data.maxamount, mockup.maxamount);
                        done();
                    });
            });

    });

    it('should be Bank post use token', (done) => {
        request(app)
            .post('/api/banks')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.image, mockup.image);
                assert.equal(resp.data.separatetype, mockup.separatetype);
                assert.equal(resp.data.separatechar, mockup.separatechar);

                assert.equal(resp.data.rows[0].rowname, mockup.rows[0].rowname);
                assert.equal(resp.data.rows[0].rowtype, mockup.rows[0].rowtype);
                assert.equal(resp.data.rows[0].required, mockup.rows[0].required);

                assert.equal(resp.data.rows[0].fields[0].fieldname, mockup.rows[0].fields[0].fieldname);
                assert.equal(resp.data.rows[0].fields[0].fieldtype, mockup.rows[0].fields[0].fieldtype);
                assert.equal(resp.data.rows[0].fields[0].fieldlength, mockup.rows[0].fields[0].fieldlength);
                assert.equal(resp.data.rows[0].fields[0].required, mockup.rows[0].fields[0].required);
                assert.equal(resp.data.rows[0].fields[0].defaultvalue, mockup.rows[0].fields[0].defaultvalue);
                assert.equal(resp.data.rows[0].fields[0].seq, mockup.rows[0].fields[0].seq);
                assert.equal(resp.data.rows[0].fields[0].example, mockup.rows[0].fields[0].example);

                assert.equal(resp.data.encrypt, mockup.encrypt);
                assert.equal(resp.data.upload, mockup.upload);
                assert.equal(resp.data.limitamount, mockup.limitamount);

                assert.equal(resp.data.encryptcmd, mockup.encryptcmd);
                assert.equal(resp.data.uploadcmd, mockup.uploadcmd);
                assert.equal(resp.data.maxamount, mockup.maxamount);
                done();
            });
    });

    it('should be bank put use token', function (done) {

        request(app)
            .post('/api/banks')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'bay',
                    image: 'http://',
                    separatetype: false,
                    separatechar: 'aaa',
                    rows: [{
                        rowname: "001",
                        rowtype: "header",
                        required: true,
                        fields: [{
                            fieldname: 'Name',
                            fieldtype: 'String',
                            fieldlength: 50,
                            required: false,
                            defaultvalue: '',
                            seq: 1,
                            example: 'Pleum',
                        }],
                    }],
                    encrypt: false,
                    upload: false,
                    limitamount: false,
                    encryptcmd: 'encryptCmd',
                    uploadcmd: 'uploadCmd',
                    maxamount: 200
                }
                request(app)
                    .put('/api/banks/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        // assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.image, update.image);
                        assert.equal(resp.data.separatetype, update.separatetype);
                        assert.equal(resp.data.separatechar, update.separatechar);

                        assert.equal(resp.data.rows[0].rowname, update.rows[0].rowname);
                        assert.equal(resp.data.rows[0].rowtype, update.rows[0].rowtype);
                        assert.equal(resp.data.rows[0].required, update.rows[0].required);

                        assert.equal(resp.data.rows[0].fields[0].fieldname, update.rows[0].fields[0].fieldname);
                        assert.equal(resp.data.rows[0].fields[0].fieldtype, update.rows[0].fields[0].fieldtype);
                        assert.equal(resp.data.rows[0].fields[0].fieldlength, update.rows[0].fields[0].fieldlength);
                        assert.equal(resp.data.rows[0].fields[0].required, update.rows[0].fields[0].required);
                        assert.equal(resp.data.rows[0].fields[0].defaultvalue, update.rows[0].fields[0].defaultvalue);
                        assert.equal(resp.data.rows[0].fields[0].seq, update.rows[0].fields[0].seq);
                        assert.equal(resp.data.rows[0].fields[0].example, update.rows[0].fields[0].example);

                        assert.equal(resp.data.encrypt, update.encrypt);
                        assert.equal(resp.data.upload, update.upload);
                        assert.equal(resp.data.limitamount, update.limitamount);

                        assert.equal(resp.data.encryptcmd, update.encryptcmd);
                        assert.equal(resp.data.uploadcmd, update.uploadcmd);
                        assert.equal(resp.data.maxamount, update.maxamount);
                        done();
                    });
            });

    });

    it('should be bank delete use token', function (done) {

        request(app)
            .post('/api/banks')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/banks/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be bank get not use token', (done) => {
        request(app)
            .get('/api/banks')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be bank post not use token', function (done) {

        request(app)
            .post('/api/banks')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be bank put not use token', function (done) {

        request(app)
            .post('/api/banks')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/banks/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be bank delete not use token', function (done) {

        request(app)
            .post('/api/banks')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/banks/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    xit('should be exampleTxtfile post use token', (done) => {
        var exampleTxt = {
            "name": "SCB",
            "image": "https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg",
            "separatetype": true,
            "separatechar": "",
            "rows": [
                {
                    "fields": [
                        {
                            "fieldname": "Record Type",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": true,
                            "example": "001"
                        },
                        {
                            "fieldname": "Company Id",
                            "fieldtype": "char",
                            "fieldlength": 12,
                            "required": true,
                            "example": "PLP0001"
                        },
                        {
                            "fieldname": "Customer Reference",
                            "fieldtype": "char",
                            "fieldlength": 32,
                            "required": true,
                            "example": "PTA"
                        },
                        {
                            "fieldname": "Message/File Date",
                            "fieldtype": "date",
                            "fieldlength": 8,
                            "required": true,
                            "example": "20201020"
                        },
                        {
                            "fieldname": "Message/File Time",
                            "fieldtype": "time",
                            "fieldlength": 6,
                            "required": true,
                            "example": "000000"
                        },
                        {
                            "fieldname": "Channel Id",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": true,
                            "example": "BCM"
                        },
                        {
                            "fieldname": "Batch Reference",
                            "fieldtype": "char",
                            "fieldlength": 32,
                            "required": false,
                            "example": ""
                        }
                    ],
                    "rowname": "Header",
                    "rowtype": "header",
                    "required": true
                },
                {
                    "fields": [
                        {
                            "fieldname": "Record Type",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": true,
                            "example": "002"
                        },
                        {
                            "fieldname": "Product Code",
                            "fieldtype": "date",
                            "fieldlength": 3,
                            "required": true,
                            "example": "Product Code"
                        },
                        {
                            "fieldname": "Value Date",
                            "fieldtype": "date",
                            "fieldlength": 8,
                            "required": true,
                            "example": "20201020"
                        },
                        {
                            "fieldname": "Debit Account No",
                            "fieldtype": "char",
                            "fieldlength": 25,
                            "required": true,
                            "example": "0333024799"
                        },
                        {
                            "fieldname": "Account Type of Debit Account",
                            "fieldtype": "number",
                            "fieldlength": 2,
                            "required": false,
                            "example": "00"
                        },
                        {
                            "fieldname": "Debit Branch Code",
                            "fieldtype": "number",
                            "fieldlength": 4,
                            "required": false,
                            "example": "0000"
                        },
                        {
                            "fieldname": "Debit Currency",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": true,
                            "example": "THB"
                        },
                        {
                            "fieldname": "Debit Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": true,
                            "example": "0000006526489140"
                        },
                        {
                            "fieldname": "Internal Reference",
                            "fieldtype": "char",
                            "fieldlength": 8,
                            "required": true,
                            "example": "00000001"
                        },
                        {
                            "fieldname": "No. of Credits",
                            "fieldtype": "number",
                            "fieldlength": 6,
                            "required": true,
                            "example": "000143"
                        },
                        {
                            "fieldname": "Fee Debit Account",
                            "fieldtype": "char",
                            "fieldlength": 15,
                            "required": true,
                            "example": "0333024799"
                        },
                        {
                            "fieldname": "Filler",
                            "fieldtype": "char",
                            "fieldlength": 9,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Media Clearing Cycle (Filler)",
                            "fieldtype": "char",
                            "fieldlength": 1,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Account Type (Fee)",
                            "fieldtype": "number",
                            "fieldlength": 2,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Debit Branch Code (Fee)",
                            "fieldtype": "number",
                            "fieldlength": 4,
                            "required": false,
                            "example": ""
                        }
                    ],
                    "rowname": "Debit Detail",
                    "rowtype": "product",
                    "required": true
                },
                {
                    "fields": [
                        {
                            "fieldname": "Record Type",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": true,
                            "example": "003"
                        },
                        {
                            "fieldname": "Credit Sequence Number",
                            "fieldtype": "number",
                            "fieldlength": 6,
                            "required": true,
                            "example": "000001"
                        },
                        {
                            "fieldname": "Credit Account",
                            "fieldtype": "char",
                            "fieldlength": 25,
                            "required": true,
                            "example": "2062019657"
                        },
                        {
                            "fieldname": "Credit Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": true,
                            "example": "0000000000400000"
                        },
                        {
                            "fieldname": "Credit Currency",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": true,
                            "example": "THB"
                        },
                        {
                            "fieldname": "Internal Reference",
                            "fieldtype": "char",
                            "fieldlength": 8,
                            "required": true,
                            "example": "00000001"
                        },
                        {
                            "fieldname": "WHT Present",
                            "fieldtype": "char",
                            "fieldlength": 1,
                            "required": true,
                            "example": "N"
                        },
                        {
                            "fieldname": "Invoice Details Present",
                            "fieldtype": "char",
                            "fieldlength": 1,
                            "required": true,
                            "example": "N"
                        },
                        {
                            "fieldname": "Credit Advice Required",
                            "fieldtype": "char",
                            "fieldlength": 1,
                            "required": true,
                            "example": "Y"
                        },
                        {
                            "fieldname": "Delivery Mode",
                            "fieldtype": "char",
                            "fieldlength": 1,
                            "required": false,
                            "example": "S"
                        },
                        {
                            "fieldname": "Pickup Location",
                            "fieldtype": "char",
                            "fieldlength": 4,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "WHT Form Type",
                            "fieldtype": "number",
                            "fieldlength": 2,
                            "required": false,
                            "example": "00"
                        },
                        {
                            "fieldname": "WHT Tax Running No.",
                            "fieldtype": "char",
                            "fieldlength": 14,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "WHT Attach No.",
                            "fieldtype": "number",
                            "fieldlength": 6,
                            "required": false,
                            "example": "000000"
                        },
                        {
                            "fieldname": "No. of WHT Details",
                            "fieldtype": "number",
                            "fieldlength": 2,
                            "required": false,
                            "example": "00"
                        },
                        {
                            "fieldname": "Total WHT Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": false,
                            "example": "0000000000000000"
                        },
                        {
                            "fieldname": "No. of Invoice Details",
                            "fieldtype": "number",
                            "fieldlength": 6,
                            "required": false,
                            "example": "000000"
                        },
                        {
                            "fieldname": "Total Invoice Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": false,
                            "example": "000000000000000"
                        },
                        {
                            "fieldname": "WHT Pay Type",
                            "fieldtype": "number",
                            "fieldlength": 1,
                            "required": false,
                            "example": "0"
                        },
                        {
                            "fieldname": "WHT Remark",
                            "fieldtype": "char",
                            "fieldlength": 40,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "WHT Deduct Date",
                            "fieldtype": "date",
                            "fieldlength": 8,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Receiving Bank Code",
                            "fieldtype": "number",
                            "fieldlength": 3,
                            "required": false,
                            "example": "014"
                        },
                        {
                            "fieldname": "Receiving Bank Name",
                            "fieldtype": "char",
                            "fieldlength": 35,
                            "required": false,
                            "example": "SIAM COMMERCIAL BANK PUBLIC CO"
                        },
                        {
                            "fieldname": "Receiving Branch Code",
                            "fieldtype": "number",
                            "fieldlength": 4,
                            "required": false,
                            "example": "0000"
                        },
                        {
                            "fieldname": "Receiving Branch Name",
                            "fieldtype": "char",
                            "fieldlength": 35,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "WHT Signatory",
                            "fieldtype": "char",
                            "fieldlength": 1,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Beneficiary Notification",
                            "fieldtype": "char",
                            "fieldlength": 1,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Customer Reference Number",
                            "fieldtype": "char",
                            "fieldlength": 20,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Cheque Reference Document Type",
                            "fieldtype": "char",
                            "fieldlength": 1,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payment Type Code",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "ServicesType",
                            "fieldtype": "char",
                            "fieldlength": 2,
                            "required": false,
                            "example": "04"
                        },
                        {
                            "fieldname": "Remark",
                            "fieldtype": "char",
                            "fieldlength": 50,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "SCB Remark",
                            "fieldtype": "char",
                            "fieldlength": 18,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Beneficiary Charge",
                            "fieldtype": "char",
                            "fieldlength": 2,
                            "required": false,
                            "example": "B"
                        }
                    ],
                    "rowname": "Credit Detail",
                    "rowtype": "transection",
                    "required": true
                },
                {
                    "fields": [
                        {
                            "fieldname": "Record Type",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": true,
                            "example": "004"
                        },
                        {
                            "fieldname": "Internal Reference",
                            "fieldtype": "char",
                            "fieldlength": 0,
                            "required": true,
                            "example": "00000001"
                        },
                        {
                            "fieldname": "Credit Sequence Number",
                            "fieldtype": "number",
                            "fieldlength": 6,
                            "required": true,
                            "example": "000001"
                        },
                        {
                            "fieldname": "Payee1 IDCard ",
                            "fieldtype": "number",
                            "fieldlength": 15,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee1 Name (Thai)",
                            "fieldtype": "char",
                            "fieldlength": 100,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee1 Address 1",
                            "fieldtype": "char",
                            "fieldlength": 70,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee1 Address 2",
                            "fieldtype": "char",
                            "fieldlength": 70,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee1 Address 3",
                            "fieldtype": "char",
                            "fieldlength": 70,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee1 Tax ID",
                            "fieldtype": "char",
                            "fieldlength": 10,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee1 Name (English)",
                            "fieldtype": "char",
                            "fieldlength": 70,
                            "required": false,
                            "example": "'DR.���Ҿ�ó ����Ե�"
                        },
                        {
                            "fieldname": "Payee1 Fax Number",
                            "fieldtype": "number",
                            "fieldlength": 10,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee1 Mobile Phone Number",
                            "fieldtype": "number",
                            "fieldlength": 10,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee1 E-mail Address",
                            "fieldtype": "char",
                            "fieldlength": 64,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee2 Name (Thai)",
                            "fieldtype": "char",
                            "fieldlength": 100,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee2 Address 1",
                            "fieldtype": "char",
                            "fieldlength": 70,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee2 Address 2",
                            "fieldtype": "char",
                            "fieldlength": 70,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee2 Address 3",
                            "fieldtype": "char",
                            "fieldlength": 70,
                            "required": false,
                            "example": ""
                        }
                    ],
                    "rowname": "Payee Detail",
                    "rowtype": "transection",
                    "required": false
                },
                {
                    "fields": [
                        {
                            "fieldname": "Record Type",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": true,
                            "example": "005"
                        },
                        {
                            "fieldname": "Internal Reference",
                            "fieldtype": "char",
                            "fieldlength": 8,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "Credit Sequence No.",
                            "fieldtype": "number",
                            "fieldlength": 6,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "WHT Sequence No.",
                            "fieldtype": "number",
                            "fieldlength": 2,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "WHT Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "WHT Income Type",
                            "fieldtype": "char",
                            "fieldlength": 5,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "Income Description",
                            "fieldtype": "char",
                            "fieldlength": 77,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "WHT Deduct Rate",
                            "fieldtype": "number",
                            "fieldlength": 5,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "Income Type Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": true,
                            "example": ""
                        }
                    ],
                    "rowname": "WHT Detail",
                    "rowtype": "transection",
                    "required": false
                },
                {
                    "fields": [
                        {
                            "fieldname": "Record Type",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": true,
                            "example": "006"
                        },
                        {
                            "fieldname": "Internal Reference",
                            "fieldtype": "char",
                            "fieldlength": 8,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "Credit Sequence No.",
                            "fieldtype": "number",
                            "fieldlength": 6,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "Invoice Sequence No.",
                            "fieldtype": "number",
                            "fieldlength": 6,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "Invoice Number",
                            "fieldtype": "char",
                            "fieldlength": 15,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "Invoice Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "Invoice Date",
                            "fieldtype": "date",
                            "fieldlength": 8,
                            "required": true,
                            "example": ""
                        },
                        {
                            "fieldname": "Invoice Description",
                            "fieldtype": "char",
                            "fieldlength": 70,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "PO Number",
                            "fieldtype": "char",
                            "fieldlength": 15,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "VAT Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Payee Charge Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "WHT Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": false,
                            "example": ""
                        },
                        {
                            "fieldname": "Print Language",
                            "fieldtype": "char",
                            "fieldlength": 1,
                            "required": true,
                            "example": ""
                        }
                    ],
                    "rowname": "Invoice Detail",
                    "rowtype": "transection",
                    "required": false
                },
                {
                    "fields": [
                        {
                            "fieldname": "Record Type",
                            "fieldtype": "char",
                            "fieldlength": 3,
                            "required": true,
                            "example": "999"
                        },
                        {
                            "fieldname": "Total No. of Debits",
                            "fieldtype": "number",
                            "fieldlength": 6,
                            "required": true,
                            "example": "000002"
                        },
                        {
                            "fieldname": "Total No. of Credits",
                            "fieldtype": "number",
                            "fieldlength": 6,
                            "required": true,
                            "example": "000403"
                        },
                        {
                            "fieldname": "Total Amount",
                            "fieldtype": "number",
                            "fieldlength": 16,
                            "required": true,
                            "example": "0000022054740480"
                        }
                    ],
                    "rowname": "Trailer",
                    "rowtype": "footer",
                    "required": true
                }
            ],
            "encryptcmd": "test",
            "uploadcmd": "test/test",
            "maxamount": 5000000
        };
        request(app)
            .post('/api/banks/example/txtfile')
            .set('Authorization', 'Bearer ' + token)
            .send(exampleTxt)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    afterEach(function (done) {
        Bank.deleteMany().exec(done);
    });

});