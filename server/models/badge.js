var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var BadgeSchema = Schema({
    title: String,
    description: String,
    category: String,
    color: String,
    awarded: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("Badge", BadgeSchema);