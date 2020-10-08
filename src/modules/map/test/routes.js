'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Map = mongoose.model('Map');

var credentials,
    token,
    mockup;

describe('Map CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: "SSB AP-Bay",
            image: "Logo",
            dataset: {
                name: "bay",
                image: "http: //",
                separatetype: false,
                separatechar: " ",
                rows: [
                    {
                        fields: [
                            {
                                fieldname: "accountname",
                                fieldtype: "String",
                                fieldlength: 50,
                                defaultvalue: "",
                                seq: 1,
                                example: "Pleum",
                                mapfield: "accountname"
                            },
                            {
                                fieldname: "accountid",
                                fieldtype: "String",
                                fieldlength: 20,
                                defaultvalue: "",
                                seq: 1,
                                example: "Pleum",
                                mapfield: "accountid"
                            }
                        ]
                    }
                ],
                encryptcmd: "encryptCmd",
                uploadcmd: "uploadCmd",
                maxamount: 200
            },
            datasource: {
                name: "SSB",
                sourcetype: "db",
                sourcedb: {
                    dbtype: "sql",
                    host: "1.1.1.1",
                    username: "test",
                    password: "123456"
                },
                query: "select name,accno from sourcetable",
                sourcefile: {
                    filetype: "excel",
                    filepath: ""
                },
                fields: [
                    {
                        fieldname: "Name",
                        fieldtype: "String",
                        fieldlength: 50,
                        defaultvalue: "",
                        seq: 1,
                        example: "Pleum"
                    }
                ]
            }
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

    it('should be Map get use token', (done) => {
        request(app)
            .get('/api/maps')
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

    it('should be Map get by id', function (done) {

        request(app)
            .post('/api/maps')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/maps/' + resp.data._id)
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

                        assert.equal(resp.data.dataset.name, mockup.dataset.name);
                        assert.equal(resp.data.dataset.image, mockup.dataset.image);
                        assert.equal(resp.data.dataset.separatetype, mockup.dataset.separatetype);
                        assert.equal(resp.data.dataset.separatechar, mockup.dataset.separatechar);

                        assert.equal(resp.data.dataset.rows[0].fields[0].fieldname, mockup.dataset.rows[0].fields[0].fieldname);
                        assert.equal(resp.data.dataset.rows[0].fields[0].fieldtype, mockup.dataset.rows[0].fields[0].fieldtype);
                        assert.equal(resp.data.dataset.rows[0].fields[0].fieldlength, mockup.dataset.rows[0].fields[0].fieldlength);
                        assert.equal(resp.data.dataset.rows[0].fields[0].defaultvalue, mockup.dataset.rows[0].fields[0].defaultvalue);
                        assert.equal(resp.data.dataset.rows[0].fields[0].example, mockup.dataset.rows[0].fields[0].example);
                        assert.equal(resp.data.dataset.rows[0].fields[0].mapfield, mockup.dataset.rows[0].fields[0].mapfield);


                        assert.equal(resp.data.datasource.name, mockup.datasource.name);
                        assert.equal(resp.data.datasource.sourcetype, mockup.datasource.sourcetype);
                        assert.equal(resp.data.datasource.sourcedb.dbtype, mockup.datasource.sourcedb.dbtype);
                        assert.equal(resp.data.datasource.sourcedb.host, mockup.datasource.sourcedb.host);
                        assert.equal(resp.data.datasource.sourcedb.username, mockup.datasource.sourcedb.username);
                        assert.equal(resp.data.datasource.sourcedb.password, mockup.datasource.sourcedb.password);

                        assert.equal(resp.data.datasource.query, mockup.datasource.query);

                        assert.equal(resp.data.datasource.sourcefile.filetype, mockup.datasource.sourcefile.filetype);
                        assert.equal(resp.data.datasource.sourcefile.filepath, mockup.datasource.sourcefile.filepath);
                        assert.equal(resp.data.datasource.fields[0].fieldname, mockup.datasource.fields[0].fieldname);
                        assert.equal(resp.data.datasource.fields[0].fieldtype, mockup.datasource.fields[0].fieldtype);
                        assert.equal(resp.data.datasource.fields[0].fieldlength, mockup.datasource.fields[0].fieldlength);
                        assert.equal(resp.data.datasource.fields[0].defaultvalue, mockup.datasource.fields[0].defaultvalue);

                        done();
                    });
            });

    });

    it('should be Map post use token', (done) => {
        request(app)
            .post('/api/maps')
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

                assert.equal(resp.data.dataset.name, mockup.dataset.name);
                assert.equal(resp.data.dataset.image, mockup.dataset.image);
                assert.equal(resp.data.dataset.separatetype, mockup.dataset.separatetype);
                assert.equal(resp.data.dataset.separatechar, mockup.dataset.separatechar);

                assert.equal(resp.data.dataset.rows[0].fields[0].fieldname, mockup.dataset.rows[0].fields[0].fieldname);
                assert.equal(resp.data.dataset.rows[0].fields[0].fieldtype, mockup.dataset.rows[0].fields[0].fieldtype);
                assert.equal(resp.data.dataset.rows[0].fields[0].fieldlength, mockup.dataset.rows[0].fields[0].fieldlength);
                assert.equal(resp.data.dataset.rows[0].fields[0].defaultvalue, mockup.dataset.rows[0].fields[0].defaultvalue);
                assert.equal(resp.data.dataset.rows[0].fields[0].example, mockup.dataset.rows[0].fields[0].example);
                assert.equal(resp.data.dataset.rows[0].fields[0].mapfield, mockup.dataset.rows[0].fields[0].mapfield);

                assert.equal(resp.data.datasource.name, mockup.datasource.name);
                assert.equal(resp.data.datasource.sourcetype, mockup.datasource.sourcetype);
                assert.equal(resp.data.datasource.sourcedb.dbtype, mockup.datasource.sourcedb.dbtype);
                assert.equal(resp.data.datasource.sourcedb.host, mockup.datasource.sourcedb.host);
                assert.equal(resp.data.datasource.sourcedb.username, mockup.datasource.sourcedb.username);
                assert.equal(resp.data.datasource.sourcedb.password, mockup.datasource.sourcedb.password);

                assert.equal(resp.data.datasource.query, mockup.datasource.query);

                assert.equal(resp.data.datasource.sourcefile.filetype, mockup.datasource.sourcefile.filetype);
                assert.equal(resp.data.datasource.sourcefile.filepath, mockup.datasource.sourcefile.filepath);
                assert.equal(resp.data.datasource.fields[0].fieldname, mockup.datasource.fields[0].fieldname);
                assert.equal(resp.data.datasource.fields[0].fieldtype, mockup.datasource.fields[0].fieldtype);
                assert.equal(resp.data.datasource.fields[0].fieldlength, mockup.datasource.fields[0].fieldlength);
                assert.equal(resp.data.datasource.fields[0].defaultvalue, mockup.datasource.fields[0].defaultvalue);
                done();
            });
    });

    it('should be map put use token', function (done) {

        request(app)
            .post('/api/maps')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: "SSB AP-Bay",
                    image: "Logo",
                    dataset: {
                        name: "bay",
                        image: "http: //",
                        separatetype: false,
                        separatechar: " ",
                        rows: [
                            {
                                fields: [
                                    {
                                        fieldname: "accountname",
                                        fieldtype: "String",
                                        fieldlength: 50,
                                        defaultvalue: "",
                                        seq: 1,
                                        example: "Pleum",
                                        mapfield: "accountname"
                                    },
                                    {
                                        fieldname: "accountid",
                                        fieldtype: "String",
                                        fieldlength: 20,
                                        defaultvalue: "",
                                        seq: 1,
                                        example: "Pleum",
                                        mapfield: "accountid"
                                    }
                                ]
                            }
                        ],
                        encryptcmd: "encryptCmd",
                        uploadcmd: "uploadCmd",
                        maxamount: 200
                    },
                    datasource: {
                        name: "SSB",
                        sourcetype: "db",
                        sourcedb: {
                            dbtype: "sql",
                            host: "1.1.1.1",
                            username: "test",
                            password: "123456"
                        },
                        query: "select name,accno from sourcetable",
                        sourcefile: {
                            filetype: "excel",
                            filepath: ""
                        },
                        fields: [
                            {
                                fieldname: "Name",
                                fieldtype: "String",
                                fieldlength: 50,
                                defaultvalue: "",
                                seq: 1,
                                example: "Pleum"
                            }
                        ]
                    }
                }
                request(app)
                    .put('/api/maps/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;


                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.image, update.image);

                        assert.equal(resp.data.dataset.name, update.dataset.name);
                        assert.equal(resp.data.dataset.image, update.dataset.image);
                        assert.equal(resp.data.dataset.separatetype, update.dataset.separatetype);
                        assert.equal(resp.data.dataset.separatechar, update.dataset.separatechar);

                        assert.equal(resp.data.dataset.rows[0].fields[0].fieldname, update.dataset.rows[0].fields[0].fieldname);
                        assert.equal(resp.data.dataset.rows[0].fields[0].fieldtype, update.dataset.rows[0].fields[0].fieldtype);
                        assert.equal(resp.data.dataset.rows[0].fields[0].fieldlength, update.dataset.rows[0].fields[0].fieldlength);
                        assert.equal(resp.data.dataset.rows[0].fields[0].defaultvalue, update.dataset.rows[0].fields[0].defaultvalue);
                        assert.equal(resp.data.dataset.rows[0].fields[0].example, update.dataset.rows[0].fields[0].example);
                        assert.equal(resp.data.dataset.rows[0].fields[0].mapfield, update.dataset.rows[0].fields[0].mapfield);

                        assert.equal(resp.data.datasource.name, update.datasource.name);
                        assert.equal(resp.data.datasource.sourcetype, update.datasource.sourcetype);
                        assert.equal(resp.data.datasource.sourcedb.dbtype, update.datasource.sourcedb.dbtype);
                        assert.equal(resp.data.datasource.sourcedb.host, update.datasource.sourcedb.host);
                        assert.equal(resp.data.datasource.sourcedb.username, update.datasource.sourcedb.username);
                        assert.equal(resp.data.datasource.sourcedb.password, update.datasource.sourcedb.password);

                        assert.equal(resp.data.datasource.query, update.datasource.query);

                        assert.equal(resp.data.datasource.sourcefile.filetype, update.datasource.sourcefile.filetype);
                        assert.equal(resp.data.datasource.sourcefile.filepath, update.datasource.sourcefile.filepath);
                        assert.equal(resp.data.datasource.fields[0].fieldname, update.datasource.fields[0].fieldname);
                        assert.equal(resp.data.datasource.fields[0].fieldtype, update.datasource.fields[0].fieldtype);
                        assert.equal(resp.data.datasource.fields[0].fieldlength, update.datasource.fields[0].fieldlength);
                        assert.equal(resp.data.datasource.fields[0].defaultvalue, update.datasource.fields[0].defaultvalue);

                        done();
                    });
            });

    });

    it('should be map delete use token', function (done) {

        request(app)
            .post('/api/maps')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/maps/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be map get not use token', (done) => {
        request(app)
            .get('/api/maps')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be map post not use token', function (done) {

        request(app)
            .post('/api/maps')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be map put not use token', function (done) {

        request(app)
            .post('/api/maps')
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
                    .put('/api/maps/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be map delete not use token', function (done) {

        request(app)
            .post('/api/maps')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/maps/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Map.deleteMany().exec(done);
    });

});