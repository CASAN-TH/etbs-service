'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Source = mongoose.model('Source');

var credentials,
    token,
    mockup;

describe('Source CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: "sourcename",
            sourcetype: "db",
            sourcedb: {
                dbtype: "sql",
                host: "1.1.1.1",
                username: "test",
                password: "123456",
            },
            sourcefile: {
                filetype: "excel",
                filepath: ""
            },
            query: "",
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

    it('should be Source get use token', (done) => {
        request(app)
            .get('/api/sources')
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

    it('should be Source get by id', function (done) {

        request(app)
            .post('/api/sources')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/sources/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.sourcetype, mockup.sourcetype);
                        assert.equal(resp.data.sourcedb.dbtype, mockup.sourcedb.dbtype);
                        assert.equal(resp.data.sourcedb.host, mockup.sourcedb.host);
                        assert.equal(resp.data.sourcedb.username, mockup.sourcedb.username);
                        assert.equal(resp.data.sourcedb.password, mockup.sourcedb.password);
                        assert.equal(resp.data.sourcefile.filetype, mockup.sourcefile.filetype);
                        assert.equal(resp.data.sourcefile.filepath, mockup.sourcefile.filepath);

                        assert.equal(resp.data.query, mockup.query);

                        assert.equal(resp.data.fields[0].fieldname, mockup.fields[0].fieldname);
                        assert.equal(resp.data.fields[0].fieldtype, mockup.fields[0].fieldtype);
                        assert.equal(resp.data.fields[0].fieldlength, mockup.fields[0].fieldlength);
                        assert.equal(resp.data.fields[0].defaultvalue, mockup.fields[0].defaultvalue);
                        assert.equal(resp.data.fields[0].seq, mockup.fields[0].seq);
                        assert.equal(resp.data.fields[0].example, mockup.fields[0].example);
                        done();
                    });
            });

    });

    it('should be Source post use token', (done) => {
        request(app)
            .post('/api/sources')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                // assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.sourcetype, mockup.sourcetype);
                assert.equal(resp.data.sourcedb.dbtype, mockup.sourcedb.dbtype);
                assert.equal(resp.data.sourcedb.host, mockup.sourcedb.host);
                assert.equal(resp.data.sourcedb.username, mockup.sourcedb.username);
                assert.equal(resp.data.sourcedb.password, mockup.sourcedb.password);
                assert.equal(resp.data.sourcefile.filetype, mockup.sourcefile.filetype);
                assert.equal(resp.data.sourcefile.filepath, mockup.sourcefile.filepath);

                assert.equal(resp.data.query, mockup.query);

                assert.equal(resp.data.fields[0].fieldname, mockup.fields[0].fieldname);
                assert.equal(resp.data.fields[0].fieldtype, mockup.fields[0].fieldtype);
                assert.equal(resp.data.fields[0].fieldlength, mockup.fields[0].fieldlength);
                assert.equal(resp.data.fields[0].defaultvalue, mockup.fields[0].defaultvalue);
                assert.equal(resp.data.fields[0].seq, mockup.fields[0].seq);
                assert.equal(resp.data.fields[0].example, mockup.fields[0].example);
                done();
            });
    });

    it('should be source put use token', function (done) {

        request(app)
            .post('/api/sources')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: "sourcename",
                    sourcetype: "db",
                    sourcedb: {
                        dbtype: "sql",
                        host: "1.1.1.1",
                        username: "test",
                        password: "123456",
                    },
                    sourcefile: {
                        filetype: "excel",
                        filepath: ""
                    },
                    query: "",
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
                request(app)
                    .put('/api/sources/' + resp.data._id)
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
                        assert.equal(resp.data.sourcetype, update.sourcetype);
                        assert.equal(resp.data.sourcedb.dbtype, update.sourcedb.dbtype);
                        assert.equal(resp.data.sourcedb.host, update.sourcedb.host);
                        assert.equal(resp.data.sourcedb.username, update.sourcedb.username);
                        assert.equal(resp.data.sourcedb.password, update.sourcedb.password);
                        assert.equal(resp.data.sourcefile.filetype, update.sourcefile.filetype);
                        assert.equal(resp.data.sourcefile.filepath, update.sourcefile.filepath);

                        assert.equal(resp.data.query, update.query);

                        assert.equal(resp.data.fields[0].fieldname, update.fields[0].fieldname);
                        assert.equal(resp.data.fields[0].fieldtype, update.fields[0].fieldtype);
                        assert.equal(resp.data.fields[0].fieldlength, update.fields[0].fieldlength);
                        assert.equal(resp.data.fields[0].defaultvalue, update.fields[0].defaultvalue);
                        assert.equal(resp.data.fields[0].seq, update.fields[0].seq);
                        assert.equal(resp.data.fields[0].example, update.fields[0].example);
                        done();
                    });
            });

    });

    it('should be source delete use token', function (done) {

        request(app)
            .post('/api/sources')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/sources/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be source get not use token', (done) => {
        request(app)
            .get('/api/sources')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be source post not use token', function (done) {

        request(app)
            .post('/api/sources')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be source put not use token', function (done) {

        request(app)
            .post('/api/sources')
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
                    .put('/api/sources/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be source delete not use token', function (done) {

        request(app)
            .post('/api/sources')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/sources/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Source.deleteMany().exec(done);
    });

});