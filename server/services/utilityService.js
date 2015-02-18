var getHost = function(req) {
    "use strict";

    return req.hostname;
};

var getProtocol = function(req) {
    "use strict";

    return req.protocol;
};

exports.getHost = getHost;
exports.getProtocol = getProtocol;