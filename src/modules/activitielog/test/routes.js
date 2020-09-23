'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Activitielog = mongoose.model('Activitielog');

var credentials,
    token,
    mockup;

describe('Activitielog CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "hospitalname": "โรงพยาบาลเปาโล",
            "mapings": [
                {
                    "mapname": "SSB AP-BAY",
                    "systems": [
                        {
                            "systemname": "DataSet",
                            "status": true,
                            "systemlog": "success!"
                        }
                    ]
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

    it('should be Activitielog get use token', (done) => {
        request(app)
            .get('/api/activitielogs')
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

    it('should be Activitielog get by id', function (done) {

        request(app)
            .post('/api/activitielogs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/activitielogs/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.hospitalname, mockup.hospitalname);
                        assert.equal(resp.data.mapings[0].mapname, mockup.mapings[0].mapname);
                        assert.equal(resp.data.mapings[0].systems[0].systemname, mockup.mapings[0].systems[0].systemname);
                        assert.equal(resp.data.mapings[0].systems[0].status, mockup.mapings[0].systems[0].status);
                        assert.equal(resp.data.mapings[0].systems[0].systemlog, mockup.mapings[0].systems[0].systemlog);
                        done();
                    });
            });

    });

    it('should be Activitielog post use token', (done) => {
        request(app)
            .post('/api/activitielogs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.hospitalname, mockup.hospitalname);
                assert.equal(resp.data.mapings[0].mapname, mockup.mapings[0].mapname);
                assert.equal(resp.data.mapings[0].systems[0].systemname, mockup.mapings[0].systems[0].systemname);
                assert.equal(resp.data.mapings[0].systems[0].status, mockup.mapings[0].systems[0].status);
                assert.equal(resp.data.mapings[0].systems[0].systemlog, mockup.mapings[0].systems[0].systemlog);
                done();
            });
    });

    it('should be activitielog put use token', function (done) {

        request(app)
            .post('/api/activitielogs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    "hospitalname": "โรงพยาบาลเปาโล",
                    "mapings": [
                        {
                            "mapname": "SSB AP-BAY",
                            "systems": [
                                {
                                    "systemname": "DataSet",
                                    "status": true,
                                    "systemlog": "success!"
                                }
                            ]
                        }
                    ]
                }
                request(app)
                    .put('/api/activitielogs/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.hospitalname, mockup.hospitalname);
                        assert.equal(resp.data.mapings[0].mapname, mockup.mapings[0].mapname);
                        assert.equal(resp.data.mapings[0].systems[0].systemname, mockup.mapings[0].systems[0].systemname);
                        assert.equal(resp.data.mapings[0].systems[0].status, mockup.mapings[0].systems[0].status);
                        assert.equal(resp.data.mapings[0].systems[0].systemlog, mockup.mapings[0].systems[0].systemlog);
                        done();
                    });
            });

    });

    it('should be activitielog delete use token', function (done) {

        request(app)
            .post('/api/activitielogs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/activitielogs/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be activitielog get not use token', (done) => {
        request(app)
            .get('/api/activitielogs')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be activitielog post not use token', function (done) {

        request(app)
            .post('/api/activitielogs')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be activitielog put not use token', function (done) {

        request(app)
            .post('/api/activitielogs')
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
                    .put('/api/activitielogs/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be activitielog delete not use token', function (done) {

        request(app)
            .post('/api/activitielogs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/activitielogs/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Activitielog.deleteMany().exec(done);
    });

});