app.service('listsService', ['$http', function ($http) {

    var $this = this;

    this.generateRequiredIngredients = function (craftList) {
        var rtn = {};
        // iterate over items in current list (array inside obj inside obj)
        $this.lists.craft_lists[craftList].forEach(itemToCraft => {
            // iterate over each item's ingredients (array of strings [id, qty, name, icon_id, id, qty, etc...])
            for (i = 0; i < itemToCraft.ingredients.length; i++) {
                // Jump every entries
                if (i == 0 || i % 4 == 0) {
                    // if another item on the craft list does not already require this ingredient create it
                    if (rtn[itemToCraft.ingredients[i]] == undefined) {
                        rtn[itemToCraft.ingredients[i]] = {
                            name: itemToCraft.ingredients[i + 2],
                            qty: parseInt(itemToCraft.ingredients[i + 1]) * parseInt(itemToCraft.qty),
                            icon_id: itemToCraft.ingredients[i + 3]
                        };
                    } else { // otherwise just add to its qty property
                        rtn[itemToCraft.ingredients[i]].qty += parseInt(itemToCraft.ingredients[i + 1]) * parseInt(itemToCraft.qty);
                    }
                }
            }
        });
        $this.requiredIngredients = rtn;
    };

    this.lists = {
        craft_lists: {
            general: [
                {
                    "_id": "6475",
                    "name": "Moogle Letter Box",
                    "craft_type": "armorer",
                    "icon_id": "53018",
                    "qty": 1,
                    "ingredients": [
                        "5074",
                        "2",
                        "Cobalt Plate",
                        "20952",
                        "5374",
                        "2",
                        "Mahogany Lumber",
                        "22462",
                        "5328",
                        "2",
                        "Undyed Woolen Cloth",
                        "21606",
                        "7007",
                        "1",
                        "Moggle Mog XII's Whisker",
                        "21002",
                        "3",
                        "6",
                        "Ice Shard",
                        "20003",
                        "5",
                        "5",
                        "Earth Shard",
                        "20006"
                    ],
                },
                {
                    "_id": "6653",
                    "name": "Stuffed Moogle",
                    "craft_type": "weaver",
                    "icon_id": "52102",
                    "qty": 2,
                    "ingredients": [
                        "5330",
                        "1",
                        "Vanya Silk",
                        "21608",
                        "5328",
                        "4",
                        "Undyed Woolen Cloth",
                        "21606",
                        "5348",
                        "3",
                        "Apkallu Down",
                        "21655",
                        "5337",
                        "8",
                        "Woolen Yarn",
                        "21660",
                        "18",
                        "1",
                        "Lightning Cluster",
                        "20017",
                        "16",
                        "1",
                        "Wind Cluster",
                        "20016"
                    ]
                },
                {
                    "_id": "6684",
                    "name": "Moogle Rug",
                    "craft_type": "weaver",
                    "icon_id": "52003",
                    "qty": 3,
                    "ingredients": [
                        "5330",
                        "1",
                        "Vanya Silk",
                        "21608",
                        "5328",
                        "4",
                        "Undyed Woolen Cloth",
                        "21606",
                        "5327",
                        "3",
                        "Undyed Linen",
                        "21605",
                        "5337",
                        "8",
                        "Woolen Yarn",
                        "21660",
                        "18",
                        "1",
                        "Lightning Cluster",
                        "20017",
                        "16",
                        "1",
                        "Wind Cluster",
                        "20016"
                    ]
                }
            ],
            lessgeneral: [
                {
                    "_id": "6475",
                    "name": "Moogle Letter Box",
                    "craft_type": "armorer",
                    "icon_id": "53018",
                    "qty": 99,
                    "ingredients": [
                        "5074",
                        "2",
                        "Cobalt Plate",
                        "20952",
                        "5374",
                        "2",
                        "Mahogany Lumber",
                        "22462",
                        "5328",
                        "2",
                        "Undyed Woolen Cloth",
                        "21606",
                        "7007",
                        "1",
                        "Moggle Mog XII's Whisker",
                        "21002",
                        "3",
                        "6",
                        "Ice Shard",
                        "20003",
                        "5",
                        "5",
                        "Earth Shard",
                        "20006"
                    ],
                },
                {
                    "_id": "6653",
                    "name": "Stuffed Moogle",
                    "craft_type": "weaver",
                    "icon_id": "52102",
                    "qty": 99,
                    "ingredients": [
                        "5330",
                        "1",
                        "Vanya Silk",
                        "21608",
                        "5328",
                        "4",
                        "Undyed Woolen Cloth",
                        "21606",
                        "5348",
                        "3",
                        "Apkallu Down",
                        "21655",
                        "5337",
                        "8",
                        "Woolen Yarn",
                        "21660",
                        "18",
                        "1",
                        "Lightning Cluster",
                        "20017",
                        "16",
                        "1",
                        "Wind Cluster",
                        "20016"
                    ]
                },
                {
                    "_id": "6684",
                    "name": "Moogle Rug",
                    "craft_type": "weaver",
                    "icon_id": "52003",
                    "qty": 99,
                    "ingredients": [
                        "5330",
                        "1",
                        "Vanya Silk",
                        "21608",
                        "5328",
                        "4",
                        "Undyed Woolen Cloth",
                        "21606",
                        "5327",
                        "3",
                        "Undyed Linen",
                        "21605",
                        "5337",
                        "8",
                        "Woolen Yarn",
                        "21660",
                        "18",
                        "1",
                        "Lightning Cluster",
                        "20017",
                        "16",
                        "1",
                        "Wind Cluster",
                        "20016"
                    ]
                }
            ]
        }
    };

    // this.createListRecords = function (id) {
    //     let lst = {};
    //     lst.user_id = id;
    //     lst.lists = $this.lists;

    //     $http.post('http://192.168.0.4:8765/lists/', lst)
    //         .then(function (response) {
    //             if (response.data !== null) {
    //                 // $this.hasInventory = true;
    //                 // $this.unsavedChanges = false;
    //                 if (response.data.inventory != undefined) {
    //                     $this.backupInventory = response.data.inventory;
    //                 }
    //             } else {
    //                 $this.hasInventory = false;
    //             }
    //         });
    // };

}]);
