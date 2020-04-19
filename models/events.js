var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema= new Schema(
    {
        event_type: {type: String},
        event_datetime: {type: Date},
        event_severity: {type: Number},
        user: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
    }
);

// Setup a virtual for the url
EventSchema.virtual('url').get(function () {
    return '/data/events' + this._id;
});


//Export model
module.exports = mongoose.model("Event", EventSchema);