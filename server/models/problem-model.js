const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemSchema = new Schema(
    {
        number: {type: Number, required: true},
        name: {type: String, required: true},
        tags: {type: [String], required: true},
        difficulty: {type: Number, required: true},
        description: {type: String, required: true},
        html: {type: String, required: true},
        solutions: {type: [String], required: true},
        test: {type: String, required: true},
        ownerEmail: { type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Problem', ProblemSchema)