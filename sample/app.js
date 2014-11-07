"use strict";
(function () {
    angular.module("demo", ["ui.openseadragon"])
    .controller("demo", ["$scope", function ($scope) {
        $scope.options = {
            prefixUrl: "http://openseadragon.github.io/openseadragon/images/",
            tileSources: [
                "http://openseadragon.github.io/example-images/highsmith/highsmith.dzi"
            ]
        };
    }]);
})();