(function () {
    angular.module('ffxivOrganizer')
        .service('bgService', function () {

            $this = this;

            var backgrounds = function () {
                var backgrounds = [
                    'img/jumbotron-images/1.jpg',
                    'img/jumbotron-images/2.jpg',
                    'img/jumbotron-images/3.jpg',
                    'img/jumbotron-images/4.jpg',
                    'img/jumbotron-images/5.jpg',
                    'img/jumbotron-images/6.jpg',
                    'img/jumbotron-images/7.jpg',
                    'img/jumbotron-images/8.jpg',
                    'img/jumbotron-images/9.jpg',
                    'img/jumbotron-images/10.jpg'
                ];
                return backgrounds[Math.floor(Math.random() * backgrounds.length)];
            };

            this.getNewBg = function () {
                $this.bg = backgrounds();
            };

            this.getNewBg();

        })
})();
