const expect = require('chai').expect;
const Inventory = require('../models/inventory');
const sinon = require('sinon');
const sinonTestFactory = require('sinon-test');
const sinonTest = sinonTestFactory(sinon);


describe('Inventory model tests', () => {
    
    describe('Schema Validation', () => {
        it('should be invalid if user_id is empty', (done) => {
            let inventory = new Inventory();
            inventory.validate(function(err) {
                expect(err.errors.user_id).to.exist;
                done();
            });
        });
    
        it('should be invalid if inventory does not exist (it can be empty though)', (done) => {
            let inventory = new Inventory();
            inventory.validate(function(err) {
                expect(err.errors.inventory).to.exist;
                done();
            });
        });    
    
    });

    describe('Static Methods', () => {

        describe('addInventory()', () => {

            it('should use create() mongoose method', sinonTest(function() {
                this.stub(Inventory,'create');
                
                let inventory = Inventory.validInventory();
    
                Inventory.addInventory(inventory);
                sinon.assert.calledWith(Inventory.create, inventory);
            }));

            it('should handle return object correctly', sinonTest(function(done) {
                let inventory = Inventory.validInventory();
                
                let response = {
                    "user_id": "some-id",
                    "inventory": {
                       "item_id_1": {
                          "qty": 1,
                          "hq_qty": 1
                       }
                    }
                 };
                
                this.stub(Inventory,'create').yields(response, null);
    
                Inventory.addInventory(inventory, (callback) => {
                    expect(inventory.user_id).to.equal(callback.user_id);
                    done();
                });
            }));

        });

        describe('getInventory()', () => {

            it('should use findOne() mongoose method', sinonTest(function() {
                this.stub(Inventory,'findOne');

                let id = 'some-id';
    
                Inventory.getInventory(id, () => {});
                sinon.assert.calledWith(Inventory.findOne, {"user_id": id});

            }));

            it('should handle return object correctly', sinonTest(function(done) {
                let response = {
                    "user_id": "some-id",
                    "inventory": {
                       "item_id_1": {
                          "qty": 1,
                          "hq_qty": 1
                       }
                    }
                 };
                
                this.stub(Inventory,'findOne').yields(response, null);
    
                Inventory.getInventory('some-id', (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));
        
        });

        describe('updateInventory()', () => {

            it('should use findOneAndUpdate() mongoose method', sinonTest(function() {
                this.stub(Inventory,'findOneAndUpdate');
    
                let id = 'some-id';
                let inventory = Inventory.validInventory();
        
                Inventory.updateInventory(id, inventory, () => {});
                sinon.assert.calledWith(Inventory.findOneAndUpdate, {"user_id": id}, inventory);
    
            }));
    
            it('should handle return object correctly', sinonTest(function(done) {
                let response = {
                    "user_id": "some-id",
                    "inventory": {
                       "item_id_1": {
                          "qty": 1,
                          "hq_qty": 1
                       }
                    }
                 };
                let inventory = Inventory.validInventory();
                    
                this.stub(Inventory,'findOneAndUpdate').yields(response, null);
        
                Inventory.updateInventory('some-id', inventory, (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));

        });

        describe('removeInventory()', () => {

            it('should use deleteOne() mongoose method', sinonTest(function() {
                this.stub(Inventory,'deleteOne');
    
                let id = 'some-id';
        
                Inventory.removeInventory(id, () => {});
                sinon.assert.calledWith(Inventory.deleteOne, {"user_id": id});
    
            }));
    
            it('should handle return object correctly', sinonTest(function(done) {
                let response = {
                    "n": 1,
                    "ok": 1
                };
                    
                this.stub(Inventory,'deleteOne').yields(response, null);
        
                Inventory.removeInventory('some-id', (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));

        });

    });

});
