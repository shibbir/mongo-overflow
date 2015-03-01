var getHost = function(req) {
    "use strict";

    return req.hostname;
};

var getProtocol = function(req) {
    "use strict";

    return req.protocol;
};

var isSameObjectId = function(propA, propB) {};

exports.getHost = getHost;
exports.getProtocol = getProtocol;
exports.isSameObjectId = isSameObjectId;