"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PoemDataSchema = new mongoose_1.Schema({
    lines: {
        type: Array,
        required: true,
    },
    author: {
        type: Array,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('PoemData', PoemDataSchema);
//# sourceMappingURL=PoemData.js.map