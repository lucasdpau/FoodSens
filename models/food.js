var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FoodSchema = new Schema(
    {
        food_name: {type: String, required: true},
        datetime_eaten: {type: Date, required: true},
        description: {type: String, default: "No description yet"},
        tags: {type: Array },
        user: {type: Schema.Types.ObjectId, ref: 'Users', required:true},

    }
);

module.exports = mongoose.Model("Food", FoodSchema);