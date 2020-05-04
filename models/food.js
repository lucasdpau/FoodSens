var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FoodSchema= new Schema(
    {
        food_name: {type: String, required: true},
        datetime_eaten: {type: Date, required: true, default: Date.now},
        description: {type: String, default: "No description yet"},
        tags: {type: Array },
        user: {type: Schema.Types.ObjectId, ref: 'Users', required:true},
    }
);

// Setup a virtual for the url
FoodSchema.virtual('url').get(function () {
    return '/data/food' + this._id;
});

module.exports = mongoose.model("Food", FoodSchema);