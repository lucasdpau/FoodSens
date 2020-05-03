var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema= new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        join_date: {type: Date, default: Date.now},
        number_of_events: {type: Number, default: 0},
        email: {type: String}        
    }
);

// Setup a virtual for the url
UsersSchema.virtual('url').get(function () {
    return '/data/users' + this._id;
});


//Export model
module.exports = mongoose.model("Users", UsersSchema);