(function () {
angular.module('ffxivOrganizer')
.service('iconService', function () {

    this.convertIcon = function (icon) {
        var path = icon;
        if (icon.length < 6) {
            path = '0' + icon;
        }
        return path.charAt(0) + path.charAt(1) + path.charAt(2) + '000/' + path;
    }

})
})();
