var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema= new Schema(
    {
        user_name: {type: String, required: true},
        password: {type: String, required: true},
        join_date: {type: Date},
        events: {type: Number},
        
    }
);

// Setup a virtual for the url
UserSchema.virtual('url').get(function () {
    return '/data/users' + this._id;
});


//Export model
module.exports = mongoose.model("User", UserSchema);