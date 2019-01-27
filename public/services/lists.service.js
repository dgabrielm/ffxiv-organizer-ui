app.service('listsService', ['$http', function ($http) {

    var $this = this;

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
