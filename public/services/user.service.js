
// example
$http.get("controllers/test.json")
.then(function (response) {
    rtn.people = response.data;
});