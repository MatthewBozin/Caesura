"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PoemSchema = new mongoose_1.Schema({
    lines: {
        type: Array,
        required: true,
    },
    authors: {
        type: Array,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    snaps: {
        type: Array,
        required: true
    },
    comments: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('Poem', PoemSchema);
//# sourceMappingURL=Poem.js.map