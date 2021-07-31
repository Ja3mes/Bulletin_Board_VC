const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Content: { type: String, required: true },
});
module.exports = mongoose.model('post', orderSchema);
