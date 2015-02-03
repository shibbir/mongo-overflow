var config = {
    production: {
        url: "mongodb://shibbir:gunner@ds061228.mongolab.com:61228/mongo-overflow",
        testUrl: "mongodb://shibbir:gunner@ds061228.mongolab.com:61228/mongo-overflow_test"
    },
    development: {
        url: "mongodb://localhost/mongo-overflow",
        testUrl: "mongodb://localhost/mongo-overflow_test"
    }
};

exports.config = config["development"];