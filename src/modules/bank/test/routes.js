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
            separatechar: '',
            rows: [{
                fields: [{
                    fieldname: 'Name',
                    fieldtype: 'String',
                    fieldlength: 50,
                    defaultvalue: '',
                    seq: 1,
                    example: 'Pleum',
                }],
            }],
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

    it('should be Bank get use token', (done)=>{
        request(app)
        .get('/api/banks')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res)=>{
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
                        assert.equal(resp.data.separatetype, mockup.separatetype)
                        assert.equal(resp.data.separatechar, mockup.separatechar)
                        assert.equal(resp.data.rows[0].fields[0].fieldname, mockup.rows[0].fields[0].fieldname)
                        assert.equal(resp.data.rows[0].fields[0].fieldtype, mockup.rows[0].fields[0].fieldtype)
                        assert.equal(resp.data.rows[0].fields[0].fieldlength, mockup.rows[0].fields[0].fieldlength)
                        assert.equal(resp.data.rows[0].fields[0].defaultvalue, mockup.rows[0].fields[0].defaultvalue)
                        assert.equal(resp.data.rows[0].fields[0].seq, mockup.rows[0].fields[0].seq)
                        assert.equal(resp.data.rows[0].fields[0].example, mockup.rows[0].fields[0].example)
                        done();
                    });
            });

    });

    it('should be Bank post use token', (done)=>{
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
                    name: 'name update'
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
                        assert.equal(resp.data.name, update.name);
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

    it('should be bank get not use token', (done)=>{
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

    afterEach(function (done) {
        Bank.deleteMany().exec(done);
    });

});