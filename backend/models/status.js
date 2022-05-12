const mongoose = require("mongoose");

const statusSchema = mongoose.Schema({
    online: {type: Array}
});

const Status = mongoose.models.Status || mongoose.model("Status", statusSchema);
module.exports.Status = Status;