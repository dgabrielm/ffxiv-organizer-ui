app.service('listsService', ['$http', function ($http) {

    var $this = this;

    this.currentCraftList = "general";
    this.unsavedChanges = false;
    this.restoreLists = function () {
        $this.lists = JSON.parse(JSON.stringify($this.backupLists));
    };

    this.generateRequiredIngredients = function () {
        var rtn = {};
        // iterate over items in current list (array inside obj inside obj)
        $this.lists.craft_lists[$this.currentCraftList].forEach(itemToCraft => {
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

    this.createListRecords = function (id) {
        let lst = {};
        lst.user_id = id;
        lst.lists = $this.lists;

        $http.post('http://192.168.0.4:8765/lists/', lst)
            .then(function (response) {
                if (response.data !== null) {
                    $this.hasLists = true;
                    $this.unsavedChanges = false;
                    if (response.data.lists != undefined) {
                        $this.backupLists = response.data.lists;
                    }
                } else {
                    $this.hasLists = false;
                }
            });
    };

    this.persistChanges = function (id) {
        var lst = {};
        lst.lists = $this.lists;
        $http.post('http://192.168.0.4:8765/lists/' + id, lst)
            .then(function (response) {
                if (response.data !== null) {
                    $this.unsavedChanges = false;
                    $this.backupLists = JSON.parse(JSON.stringify($this.lists));
                    // add user feedback variables: saveSuccess or something
                } else {
                    // add user feedback variable: saveFailed or something
                }
            });
    };

    this.getLists = function (id) {
        $http.get('http://192.168.0.4:8765/lists/' + id)
            .then(function (response) {
                if (response.data !== null) {
                    if (response.data.lists != undefined) {
                        $this.lists = JSON.parse(JSON.stringify(response.data.lists));
                        $this.backupLists = JSON.parse(JSON.stringify(response.data.lists));
                    } else {
                        $this.lists = {
                            craft_lists: {
                                general: []
                            }
                        };
                        $this.backupLists = {
                            craft_lists: {
                                general: []
                            }
                        };
                    }
                    $this.hasLists = true;
                } else {
                    $this.lists = {
                        craft_lists: {
                            general: []
                        }
                    };
                    $this.backupLists = {
                        craft_lists: {
                            general: []
                        }
                    };
                    $this.hasLists = true;
                }
            });
    };

}]);
