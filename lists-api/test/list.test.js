const expect = require('chai').expect;
const List = require('../models/list');
const sinon = require('sinon');
const sinonTestFactory = require('sinon-test');
const sinonTest = sinonTestFactory(sinon);


describe('List model tests', () => {
    
    describe('Schema Validation', () => {
        it('should be invalid if user_id is empty', (done) => {
            let list = new List();
            list.validate(function(err) {
                expect(err.errors.user_id).to.exist;
                done();
            });
        });   

        it('should be invalid if craft_lists does not exist', (done) => {
            let list = new List();
            list.validate(function(err) {
                expect(err.errors.craft_lists).to.exist;
                done();
            });
        });  
        
        it('should be invalid if obtain_lists does not exist', (done) => {
            let list = new List();
            list.validate(function(err) {
                expect(err.errors.obtain_lists).to.exist;
                done();
            });
        });  
    
    });

    describe('Static Methods', () => {

        describe('addList()', () => {

            it('should use create() mongoose method', sinonTest(function() {
                this.stub(List,'create');
                
                let list = List.validList();
    
                List.addList(list);
                sinon.assert.calledWith(List.create, list);
            }));

            it('should handle return object correctly', sinonTest(function(done) {
                let list = List.validList();
                
                let response = {
                    "user_id": "some-id",
                    "craft_lists": {
                        "craft_list_1": undefined
                    },
                    "obtain_lists": {
                        "obtain_list_1": undefined
                    }
                };
                
                this.stub(List,'create').yields(response, null);
    
                List.addList(list, (callback) => {
                    expect(list.user_id).to.equal(callback.user_id);
                    done();
                });
            }));

        });

        describe('getList()', () => {

            it('should use findOne() mongoose method', sinonTest(function() {
                this.stub(List,'findOne');

                let id = 'some-id';
    
                List.getList(id, () => {});
                sinon.assert.calledWith(List.findOne, {"user_id": id});

            }));

            it('should handle return object correctly', sinonTest(function(done) {
                let response = {
                    "user_id": "some-id",
                    "craft_lists": {
                        "craft_list_1": undefined
                    },
                    "obtain_lists": {
                        "obtain_list_1": undefined
                    }
                };
                
                this.stub(List,'findOne').yields(response, null);
    
                List.getList('some-id', (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));
        
        });

        describe('updateList()', () => {

            it('should use findOneAndUpdate() mongoose method', sinonTest(function() {
                this.stub(List,'findOneAndUpdate');
    
                let id = 'some-id';
                let list = List.validList();
        
                List.updateList(id, list, () => {});
                sinon.assert.calledWith(List.findOneAndUpdate, {"user_id": id}, list);
    
            }));
    
            it('should handle return object correctly', sinonTest(function(done) {
                let response = {
                    "user_id": "some-id",
                    "craft_lists": {
                        "craft_list_1": undefined
                    },
                    "obtain_lists": {
                        "obtain_list_1": undefined
                    }
                };
                let list = List.validList();
                    
                this.stub(List,'findOneAndUpdate').yields(response, null);
        
                List.updateList('some-id', list, (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));

        });

        describe('removeList()', () => {

            it('should use deleteOne() mongoose method', sinonTest(function() {
                this.stub(List,'deleteOne');
    
                let id = 'some-id';
        
                List.removeList(id, () => {});
                sinon.assert.calledWith(List.deleteOne, {"user_id": id});
    
            }));
    
            it('should handle return object correctly', sinonTest(function(done) {
                let response = {
                    "n": 1,
                    "ok": 1
                };
                    
                this.stub(List,'deleteOne').yields(response, null);
        
                List.removeList('some-id', (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));

        });

    });

});
