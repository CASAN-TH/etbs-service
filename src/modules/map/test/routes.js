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
            bank: {
                name: "กรุงศรี",
                image: "http://",
                separatetype: false,
                separatechar: "",
                rows: [{
                    fields: [{
                        fieldsname: "",
                        fieldstype: "",
                        fieldslength: 50,
                        fieldsvalue: "",
                        seq: 1,
                        example: "",
                        fieldsmapping: "",
                    }],
                }],
            },
            source: {
                name: 'sourcename',
                sourcetype: "db",
                sourceDB: {
                    DBtype: "sql",
                    host: "1.1.1.1",
                    user: "admin",
                    password: "password"
                },
                sourcefile: {
                    DBtype: "excel",
                    pathfile: "c",
                },
                query: "",
                fields: {
                            fieldsname: "name",
                            fieldtype: "string",
                }
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
                        assert.equal(resp.data.bank.name, mockup.bank.name);
                        assert.equal(resp.data.bank.image, mockup.bank.image);
                        assert.equal(resp.data.bank.separatetype, mockup.bank.separatetype);
                        assert.equal(resp.data.bank.separatechar, mockup.bank.separatechar);
                        assert.equal(resp.data.bank.rows[0].fields[0].fieldsname, mockup.bank.rows[0].fields[0].fieldsname);
                        assert.equal(resp.data.bank.rows[0].fields[0].fieldstype, mockup.bank.rows[0].fields[0].fieldstype);
                        assert.equal(resp.data.bank.rows[0].fields[0].fieldslength, mockup.bank.rows[0].fields[0].fieldslength);
                        assert.equal(resp.data.bank.rows[0].fields[0].fieldsvalue, mockup.bank.rows[0].fields[0].fieldsvalue);
                        assert.equal(resp.data.bank.rows[0].fields[0].seq, mockup.bank.rows[0].fields[0].seq);
                        assert.equal(resp.data.bank.rows[0].fields[0].example, mockup.bank.rows[0].fields[0].example);
                        assert.equal(resp.data.bank.rows[0].fields[0].fieldsmapping, mockup.bank.rows[0].fields[0].fieldsmapping);

                        assert.equal(resp.data.source.name, mockup.source.name);
                        assert.equal(resp.data.source.sourcetype, mockup.source.sourcetype);
                        assert.equal(resp.data.source.sourceDB.DBtype, mockup.source.sourceDB.DBtype);
                        assert.equal(resp.data.source.sourceDB.host, mockup.source.sourceDB.host);
                        assert.equal(resp.data.source.sourceDB.user, mockup.source.sourceDB.user);
                        assert.equal(resp.data.source.sourceDB.password, mockup.source.sourceDB.password);

                        assert.equal(resp.data.source.sourceDB.sourcefile, mockup.source.sourceDB.sourcefile);
                        assert.equal(resp.data.source.sourceDB.DBtype, mockup.source.sourceDB.DBtype);
                        assert.equal(resp.data.source.sourceDB.pathfile, mockup.source.sourceDB.pathfile);

                        assert.equal(resp.data.source.sourceDB.pathfile, mockup.source.sourceDB.pathfile);
                        assert.equal(resp.data.source.sourceDB.pathfile, mockup.source.sourceDB.pathfile);
                        assert.equal(resp.data.source.sourceDB.fieldsname, mockup.source.sourceDB.fieldsname);
                        assert.equal(resp.data.source.sourceDB.fieldtype, mockup.source.sourceDB.fieldtype);

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
                    name: 'name update'
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
                        assert.equal(resp.data.bank.name, mockup.bank.name);
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