(function(app) {
    "use strict";

    app.provider("configuration", [function() {
        var _browserStoragePrefix = "mongoOverflow",
            _baseApiUrl = "http://localhost:7575/api/",
            _imageUploadMaxSize = 1024 * 1024 * 2;

        this.setBaseApiUrl = function(baseApiUrl) {
            if(baseApiUrl) {
                _baseApiUrl = baseApiUrl;
            }
        };

        this.setImageUploadSize = function(imageUploadMaxSize) {
            if(imageUploadMaxSize) {
                _imageUploadMaxSize = imageUploadMaxSize;
            }
        };

        this.setBrowserStoragePrefix = function(browserStoragePrefix) {
            if(browserStoragePrefix) {
                _browserStoragePrefix = browserStoragePrefix;
            }
        };

        this.$get = function() {
            return {
                getBrowserStoragePrefix: function() {
                    return _browserStoragePrefix;
                },
                getBaseApiUrl: function() {
                    return _baseApiUrl;
                },
                getImageUploadSize: function() {
                    return _imageUploadMaxSize;
                }
            };
        };
    }]);
})(angular.module("mongoOverflow"));