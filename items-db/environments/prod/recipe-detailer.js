var fs = require('fs');
var obj = require("./initial-data.json");

obj.forEach((item) => {
    // if the item has recipe information
    if (item.ingredients !== null) {
        // if the item has a carpenter recipe
        if (item.ingredients.carpenter.length !== 0) {
            var ArrPos = -1;
            var newIngs = [];

            item.ingredients.carpenter.forEach((i) => {
                newIngs.push(i);
                ArrPos++;
                if (ArrPos % 2 != 0) {
                    var it = obj.find(function (element) {
                        return element._id == item.ingredients.carpenter[ArrPos-1];
                    });
                    if (it !== undefined) {
                        newIngs.push(it.name);
                        newIngs.push(it.icon_id);
                    }
                }
            });
            item.ingredients.carpenter = newIngs;
        }

        if (item.ingredients.blacksmith.length !== 0) {
            var ArrPos = -1;
            var newIngs = [];

            item.ingredients.blacksmith.forEach((i) => {
                newIngs.push(i);
                ArrPos++;
                if (ArrPos % 2 != 0) {
                    var it = obj.find(function (element) {
                        return element._id == item.ingredients.blacksmith[ArrPos-1];
                    });
                    if (it !== undefined) {
                        newIngs.push(it.name);
                        newIngs.push(it.icon_id);
                    }
                }
            });
            item.ingredients.blacksmith = newIngs;
        }

        if (item.ingredients.armorer.length !== 0) {
            var ArrPos = -1;
            var newIngs = [];

            item.ingredients.armorer.forEach((i) => {
                newIngs.push(i);
                ArrPos++;
                if (ArrPos % 2 != 0) {
                    var it = obj.find(function (element) {
                        return element._id == item.ingredients.armorer[ArrPos-1];
                    });
                    if (it !== undefined) {
                        newIngs.push(it.name);
                        newIngs.push(it.icon_id);
                    }
                }
            });
            item.ingredients.armorer = newIngs;
        }

        if (item.ingredients.goldsmith.length !== 0) {
            var ArrPos = -1;
            var newIngs = [];

            item.ingredients.goldsmith.forEach((i) => {
                newIngs.push(i);
                ArrPos++;
                if (ArrPos % 2 != 0) {
                    var it = obj.find(function (element) {
                        return element._id == item.ingredients.goldsmith[ArrPos-1];
                    });
                    if (it !== undefined) {
                        newIngs.push(it.name);
                        newIngs.push(it.icon_id);
                    }
                }
            });
            item.ingredients.goldsmith = newIngs;
        }

        if (item.ingredients.leatherworker.length !== 0) {
            var ArrPos = -1;
            var newIngs = [];

            item.ingredients.leatherworker.forEach((i) => {
                newIngs.push(i);
                ArrPos++;
                if (ArrPos % 2 != 0) {
                    var it = obj.find(function (element) {
                        return element._id == item.ingredients.leatherworker[ArrPos-1];
                    });
                    if (it !== undefined) {
                        newIngs.push(it.name);
                        newIngs.push(it.icon_id);
                    }
                }
            });
            item.ingredients.leatherworker = newIngs;
        }

        if (item.ingredients.weaver.length !== 0) {
            var ArrPos = -1;
            var newIngs = [];

            item.ingredients.weaver.forEach((i) => {
                newIngs.push(i);
                ArrPos++;
                if (ArrPos % 2 != 0) {
                    var it = obj.find(function (element) {
                        return element._id == item.ingredients.weaver[ArrPos-1];
                    });
                    if (it !== undefined) {
                        newIngs.push(it.name);
                        newIngs.push(it.icon_id);
                    }
                }
            });
            item.ingredients.weaver = newIngs;
        }

        if (item.ingredients.alchemist.length !== 0) {
            var ArrPos = -1;
            var newIngs = [];

            item.ingredients.alchemist.forEach((i) => {
                newIngs.push(i);
                ArrPos++;
                if (ArrPos % 2 != 0) {
                    var it = obj.find(function (element) {
                        return element._id == item.ingredients.alchemist[ArrPos-1];
                    });
                    if (it !== undefined) {
                        newIngs.push(it.name);
                        newIngs.push(it.icon_id);
                    }
                }
            });
            item.ingredients.alchemist = newIngs;
        }

        if (item.ingredients.culinarian.length !== 0) {
            var ArrPos = -1;
            var newIngs = [];

            item.ingredients.culinarian.forEach((i) => {
                newIngs.push(i);
                ArrPos++;
                if (ArrPos % 2 != 0) {
                    var it = obj.find(function (element) {
                        return element._id == item.ingredients.culinarian[ArrPos-1];
                    });
                    if (it !== undefined) {
                        newIngs.push(it.name);
                        newIngs.push(it.icon_id);
                    }
                }
            });
            item.ingredients.culinarian = newIngs;
        }

    }
    
});

setTimeout(function () {
    fs.writeFile('initial-data.json', JSON.stringify(obj), function (err, data) {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
}, 10000);