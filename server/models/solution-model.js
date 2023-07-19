const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const SolutionSchema = new Schema(
    {
        problemId: {type: ObjectId, required: true},
        number: {type: Number, required: true},
        name: {type: String, required: true},
        timeComplexity: {type: String, required: true},
        spaceComplexity: {type: String, required: true},
        code: {type: String, required: true},
        ownerEmail: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Solution', SolutionSchema)