const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const modelCreate = new Schema({
    task: { type: String, default: "" },
    is_available: { type: Number, default: "1" },
    status: { type: String, default: "Pending" },
    user_name: { type: String, default: "" }
}, {
    timestamps: true
});

const createModel = mongoose.model("TodoList", modelCreate);

module.exports = createModel;