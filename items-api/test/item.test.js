const expect = require('chai').expect;
const Item = require('../models/item');
const sinon = require('sinon');
const sinonTestFactory = require('sinon-test');
const sinonTest = sinonTestFactory(sinon);

describe('Item model tests', () => {

    describe('Schema Validation', () => {

        it('should be invalid if _id is empty', (done) => {
            let item = new Item();
            item.validate(function (err) {
                expect(err.errors._id).to.exist;
                done();
            });
        });

        it('should be invalid if name is empty', (done) => {
            let item = new Item();
            item.validate(function (err) {
                expect(err.errors.name).to.exist;
                done();
            });
        });

        it('should be invalid if description is empty', (done) => {
            let item = new Item();
            item.validate(function (err) {
                expect(err.errors.description).to.exist;
                done();
            });
        });

        it('should be invalid if search_category is empty', (done) => {
            let item = new Item();
            item.validate(function (err) {
                expect(err.errors.search_category).to.exist;
                done();
            });
        });

        it('should be invalid if search_category_icon is empty', (done) => {
            let item = new Item();
            item.validate(function (err) {
                expect(err.errors.search_category_icon).to.exist;
                done();
            });
        });

        it('should be invalid if ingredients is empty', (done) => {
            let item = new Item();
            item.validate(function (err) {
                expect(err.errors.ingredients).to.exist;
                done();
            });
        });

    });

    describe('Static Methods', () => {

        describe('getItemById()', () => {

            it('should use findById() mongoose method', sinonTest(function () {
                this.stub(Item, 'findById');

                let id = '1';

                Item.getItemById(id, () => { });
                sinon.assert.calledWith(Item.findById, id);

            }));

            it('should handle return object correctly', sinonTest(function (done) {
                let response = Item.validItem;

                this.stub(Item, 'findById').yields(response, null);

                Item.getItemById('id', (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));

        });

        describe('getItemsByName()', () => {

            it('should use find() mongoose method', sinonTest(function () {
                this.stub(Item, 'find');

                let name = 'Gil';

                Item.getItemsByName(name, () => { });
                sinon.assert.calledWith(Item.find, { "name": { $regex: new RegExp(name), $options: 'igm' } });
            }));

            it('should handle return object correctly', sinonTest(function (done) {
                let response = Item.validItemList;

                this.stub(Item, 'find').yields(response, null);

                Item.getItemsByName('Gil', (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));

        });

        describe('getItemsByCategory()', () => {

            it('should use find() mongoose method', sinonTest(function () {
                this.stub(Item, 'find');

                let category = 'Metal';

                Item.getItemsByCategory(category, () => { });
                sinon.assert.calledWith(Item.find, { "search_category": category });
            }));

            it('should handle return object correctly', sinonTest(function (done) {
                let response = [
                    {
                        "_id": "5063",
                        "name": "Brass Ingot",
                        "description": "An ingot of smelted brass.",
                        "search_category": "Metal",
                        "search_category_icon": "60140",
                        "ingredients": {
                            "carpenter": [],
                            "blacksmith": [],
                            "armorer": [],
                            "goldsmith": [
                                "5106",
                                "2",
                                "5110",
                                "1",
                                "4",
                                "1"
                            ],
                            "leatherworker": [],
                            "weaver": [],
                            "alchemist": [],
                            "culinarian": []
                        }
                    },
                    {
                        "_id": "9363",
                        "name": "Allagan Wootz Nugget",
                        "description": "A small chunk of the alloy used by the Allagan Empire to craft heavy armor.",
                        "search_category": "Metal",
                        "search_category_icon": "60140",
                        "ingredients": "no recipe information available"
                    },
                ]

                this.stub(Item, 'find').yields(response, null);

                Item.getItemsByCategory('Metal', (callback) => {
                    expect(response).to.equal(callback);
                    done();
                });
            }));

        });

    });

});
