angular-openseadragon
=====================

Angular module for OpenSeaDragon

# Usage
Model :
```html
<seadragon options="options" />
```
Javascript :
```javascript
    angular.module("demo", ["ui.openseadragon"])
    .controller("demo", ["$scope", function ($scope) {
        $scope.options = {
            prefixUrl: "http://openseadragon.github.io/openseadragon/images/",
            tileSources: [
                "example-images/highsmith/highsmith.dzi"
            ]
        };
    }]);
```
# More docs
## Html attributes
Name | Description
---- | -----------
options | Options for instanciation (parent scope field). Not monitored if changed. See http://openseadragon.github.io/docs/OpenSeadragon.html#Options
name | Name of parent scope field to assign, if you want to access methods.
prefixUrl | Overrides the `prefixUrl` of the options. (raw value, does not evaluate angular expression)
tilesource | Overrides the `tileSources` of the options. (raw value, does not evaluate angular expression)

If you set the `name` attribute, you can access the following :
Name | Description
---- | -----------
setFullScreen(fullScreen) | See http://openseadragon.github.io/docs/OpenSeadragon.Viewer.html#setFullScreen
forceRedraw() | http://openseadragon.github.io/docs/OpenSeadragon.Viewer.html#forceRedraw
mouse | Get mouse information
mouse.position | mouse position on viewer (null if cursor is outside)
mouse.imageCoord | mouse position as image coords (null if cursor is outside)
mouse.viewportCoord | mouse position as viewport coords (null if cursor is outside)
viewport | viewport information
viewport.bounds | viewport current bounds
viewport.center | viewport current center
viewport.rotation | viewport current rotation
viewport.zoom | viewport current zoom
