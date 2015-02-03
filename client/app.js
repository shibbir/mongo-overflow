(function() {

    "use strict";

    angular.module("mongoOverflow", ["angularFileUpload"]);

    angular.module("mongoOverflow").config([
        "$httpProvider", "$compileProvider", function($httpProvider, $compileProvider) {
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
            $compileProvider.debugInfoEnabled(false);
        }
    ]);
})();