const expect = require('chai').expect;
const User = require('../models/user');
const sinon = require('sinon');
const sinonTestFactory = require('sinon-test');
const sinonTest = sinonTestFactory(sinon); // doesn't work with lambda syntax


describe('User model tests', () => {
    
    describe('Schema Validation', () => {
        it('should be invalid if first_name is empty', (done) => {
            let user = new User();
            user.validate(function(err) {
                expect(err.errors.first_name).to.exist;
                done();
            });
        });
    
        it('should be invalid if last_name is empty', (done) => {
            let user = new User();
            user.validate(function(err) {
                expect(err.errors.last_name).to.exist;
                done();
            });
        });    
    
        it('should be invalid if email_address is empty', (done) => {
            let user = new User();
            user.validate(function(err) {
                expect(err.errors.email_address).to.exist;
                done();
            });
        });
    
        it('should be invalid if character_name is empty', (done) => {
            let user = new User();
            user.validate(function(err) {
                expect(err.errors.character_name).to.exist;
                done();
            });
        });
    
        it('should be invalid if username is empty', (done) => {
            let user = new User();
            user.validate(function(err) {
                expect(err.errors.username).to.exist;
                done();
            });
        });
    
        it('should be invalid if password is empty', (done) => {
            let user = new User();
            user.validate(function(err) {
                expect(err.errors.password).to.exist;
                done();
            });
        });
    
    });

    describe('Static Methods', () => {

        describe('addUser()', () => {

            it('should use create() mongoose method', sinonTest(function() {
                this.stub(User,'create');
                
                let user = User.validUser();
    
                User.addUser(user);
                sinon.assert.calledWith(User.create, user);
            }));

            it('should handle return object correctly', sinonTest(function(done) {
                let user = User.validUser();
                
                let response = {
                    "first_name": 'first name',
                    "last_name": 'last name',
                    "email_address": 'email',
                    "character_name": 'character',
                    "username": 'username'
                };
                
                this.stub(User,'create').yields(response, null);
    
                User.addUser(user, (callback) => {
                    expect(user.username).to.equal(callback.username);
                    done();
                });
            }));

        });

        describe('getUser()', () => {

            it('should use findOne() mongoose method', sinonTest(function() {
                this.stub(User,'findOne');

                let username = 'username';
                let password = 'password';
    
                User.getUser(username, password, () => {});
                sinon.assert.calledWith(User.findOne, {"username": username, "password": password});

            }));

            it('should handle return object correctly', sinonTest(function(done) {
                let response = {
                    "first_name": 'first name',
                    "last_name": 'last name',
                    "email_address": 'email',
                    "character_name": 'character',
                    "username": 'username'
                };
                
                this.stub(User,'findOne').yields(response, null);
    
                User.getUser('username', 'password', (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));
        
        });

        describe('updateUser()', () => {

            it('should use findOneAndUpdate() mongoose method', sinonTest(function() {
                this.stub(User,'findOneAndUpdate');
    
                let username = 'username';
                let password = 'password';
                let user = User.validUser();
        
                User.updateUser(username, password, user, () => {});
                sinon.assert.calledWith(User.findOneAndUpdate, {"username": username, "password": password}, user);
    
            }));
    
            it('should handle return object correctly', sinonTest(function(done) {
                let response = {
                    "first_name": 'first name',
                    "last_name": 'last name',
                    "email_address": 'email',
                    "character_name": 'character',
                    "username": 'username'
                };
                let user = User.validUser();
                    
                this.stub(User,'findOneAndUpdate').yields(response, null);
        
                User.updateUser('username', 'password', user, (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));

        });

        describe('removeUser()', () => {

            it('should use deleteOne() mongoose method', sinonTest(function() {
                this.stub(User,'deleteOne');
    
                let username = 'username';
                let password = 'password';
        
                User.removeUser(username, password, () => {});
                sinon.assert.calledWith(User.deleteOne, {"username": username, "password": password});
    
            }));
    
            it('should handle return object correctly', sinonTest(function(done) {
                let response = {
                    "n": 1,
                    "ok": 1
                };
                    
                this.stub(User,'deleteOne').yields(response, null);
        
                User.removeUser('username', 'password', (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));

        });

    });

});
