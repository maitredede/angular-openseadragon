"use strict";
(function () {
    var module = angular.module("ui.openseadragon", []);
    module.directive("seadragon", [function () {
        return {
            restrict: "E",
            scope: {
                options: "=",
                name: "=",
                tilesource: "@",
                prefixUrl: "@"
            },
            controller: ["$scope", function ($scope) {
                $scope.osd = null;
            }],
            link: function (scope, element, attrs) {

                //Create options object
                var opts = angular.extend({}, scope.options, {
                    id: "openseadragon-" + Math.random(),
                    element: element[0],
                });
                if (attrs.tilesource) {
                    opts.tileSources = [attrs.tilesource];
                }
                if (attrs.prefixUrl) {
                    opts.prefixUrl = attrs.prefixUrl;
                }

                //Create the viewer
                scope.osd = OpenSeadragon(opts);

                //Create a wrapper
                var wrapper = {
                    setFullScreen: function (fullScreen) {
                        scope.osd.setFullScreen(fullScreen);
                    },
                    forceRedraw: function () {
                        scope.osd.forceRedraw();
                    },
                    mouse: {
                        position: null,
                        imageCoord: null,
                        viewportCoord: null,
                    },
                    zoom: 0,
                    viewport: {
                        bounds: null,
                        center: null,
                        rotation: 0,
                        zoom: 0,
                    }
                }
                //if @name is set, put the wrapper in the scope and handle the events
                var zoomHandler = null;
                var updateViewportHandler = null;
                if (attrs.name) {
                    //Make the OSD available to parent scope
                    scope.$parent[attrs.name] = wrapper;

                    //Define event handlers
                    zoomHandler = function (e) {
                        scope.$apply(function () {
                            wrapper.zoom = e.zoom;
                        });
                    }
                    updateViewportHandler = function (e) {
                        scope.$apply(function () {
                            wrapper.viewport = {
                                bounds: scope.osd.viewport.getBounds(false),
                                center: scope.osd.viewport.getCenter(false),
                                rotation: scope.osd.viewport.getRotation(),
                                zoom: scope.osd.viewport.getZoom(false),
                            };
                        });
                    }

                    //Assign event handlers
                    scope.osd.addHandler("zoom", zoomHandler);
                    scope.osd.addHandler("update-viewport", updateViewportHandler);

                    //Add a mouse handler
                    scope.mouse = new OpenSeadragon.MouseTracker({
                        element: scope.osd.canvas,
                        enterHandler: function (e) {
                            if (scope.osd.viewport) {
                                var coord = OpenSeadragon.getElementPosition(scope.osd.canvas);
                                var pos = e.position.plus(coord);
                                var mouse = {
                                    position: pos,
                                    imageCoord: scope.osd.viewport.windowToImageCoordinates(pos),
                                    viewportCoord: scope.osd.viewport.windowToViewportCoordinates(pos),
                                }
                                scope.$apply(function () {
                                    wrapper.mouse = mouse;
                                });
                            }
                        },
                        moveHandler: function (e) {
                            if (scope.osd.viewport) {
                                var coord = OpenSeadragon.getElementPosition(scope.osd.canvas);
                                var pos = e.position.plus(coord);
                                var mouse = {
                                    position: pos,
                                    imageCoord: scope.osd.viewport.windowToImageCoordinates(pos),
                                    viewportCoord: scope.osd.viewport.windowToViewportCoordinates(pos),
                                }
                                scope.$apply(function () {
                                    wrapper.mouse = mouse;
                                });
                            }
                        },
                        exitHandler: function (e) {
                            scope.$apply(function () {
                                wrapper.mouse.position = null;
                                wrapper.mouse.imageCoord = null;
                                wrapper.mouse.viewportCoord = null;
                            });
                        },
                    });
                    scope.mouse.setTracking(true);
                }

                //When element is destroyed, destroy the viewer
                element.on('$destroy', function () {
                    //if @nam eis set, remove it from parent scope, and remove event handlers
                    if (attrs.name) {
                        //Remove from parent scope
                        scope.$parent[attrs.name] = null;

                        //Destroy mouse handler
                        scope.mouse.destroy();

                        //Remove event handlers
                        scope.osd.removeHandler("zoom", zoomHandler);
                        scope.osd.removeHandler("update-viewport", updateViewportHandler);
                    }

                    //Destroy the viewer
                    scope.osd.destroy();
                });
            },
        };
    }]);
})();