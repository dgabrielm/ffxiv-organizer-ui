app.service('listsService', ['$http', 'LISTS_CONFIG', function ($http, LISTS_CONFIG) {

    var $this = this;

    this.currentCraftList = "general";
    this.unsavedChanges = false;
    this.switch = { current: true };
    this.restoreLists = function () {
        $this.lists = JSON.parse(JSON.stringify($this.backupLists));
    };

    this.removeList = function (listToRemove) {
        delete $this.lists.craft_lists[listToRemove];
        $this.currentCraftList = 'general';
    };

    this.addList = function (listToAdd) {
        $this.lists.craft_lists[listToAdd] = [];
        $this.currentCraftList = listToAdd;
    };

    this.clearCurrentList = function () {
        $this.lists.craft_lists[$this.currentCraftList] = [];
    };

    this.generateRequiredIngredients = function () {
        var rtn = {};
        var lst = [];

        if ($this.switch.current === true) {
            lst = $this.lists.craft_lists[$this.currentCraftList];
        } else {
            Object.keys($this.lists.craft_lists).forEach(function (key, index) {
                lst = lst.concat($this.lists.craft_lists[key]);
            });
        }

        // iterate over items in current list (array inside obj inside obj)
        lst.forEach(itemToCraft => {
            // iterate over each item's ingredients (array of strings [id, qty, name, icon_id, id, qty, etc...])
            for (i = 0; i < itemToCraft.ingredients.length; i++) {
                // Jump every entries
                if (i == 0 || i % 4 == 0) {
                    // if another item on the craft list does not already require this ingredient create it
                    if (rtn[itemToCraft.ingredients[i]] == undefined) {
                        rtn[itemToCraft.ingredients[i]] = {
                            name: itemToCraft.ingredients[i + 2],
                            icon_id: itemToCraft.ingredients[i + 3],
                            qty: parseInt(itemToCraft.ingredients[i + 1]) * parseInt(itemToCraft.qty)
                        };
                    } else { // otherwise just add to its qty property
                        rtn[itemToCraft.ingredients[i]].qty += parseInt(itemToCraft.ingredients[i + 1]) * parseInt(itemToCraft.qty);
                    }
                }
            }



        });
        $this.requiredIngredients = rtn;
    };

    this.assessListItems = function (inventory) {
        // iterate over items in current craft list
        $this.lists.craft_lists[$this.currentCraftList].forEach(craftListItem => {
            // start off assuming inventory contains required items
            craftListItem.hasItems = true;
            // iterate over each item's ingredients
            for (i = 0; i < craftListItem.ingredients.length; i++) {
                // jump every 4 (land on id)
                if (i == 0 || i % 4 == 0) {
                    // if inventory has any of that item
                    if (inventory[craftListItem.ingredients[i]] != undefined) {
                        // if inventory's qty is less than required qty set condition to false
                        if (inventory[craftListItem.ingredients[i]].qty < parseInt(craftListItem.ingredients[i + 1] * parseInt(craftListItem.qty))) {
                            craftListItem.hasItems = false;
                        }

                    } else {
                        craftListItem.hasItems = false;
                    }

                }
            }
        });
    };

    this.createListRecords = function (id) {
        let lst = {};
        lst.user_id = id;
        lst.lists = $this.lists;

        $http.post(LISTS_CONFIG.location + ':' + LISTS_CONFIG.port + '/lists/', lst)
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

    this.deleteItem = function (item) {
        var itemToRemove = $this.lists.craft_lists[$this.currentCraftList].indexOf(item);
        $this.lists.craft_lists[$this.currentCraftList].splice(itemToRemove, 1);
    };

    this.persistChanges = function (id) {
        var lst = {};
        lst.lists = $this.lists;
        $http.post(LISTS_CONFIG.location + ':' + LISTS_CONFIG.port + '/lists/' + id, lst)
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
        $http.get(LISTS_CONFIG.location + ':' + LISTS_CONFIG.port + '/lists/' + id)
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
