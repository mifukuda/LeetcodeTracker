const Problem = require('../models/problem-model');
const User = require('../models/user-model');
const jwt = require("jsonwebtoken");

createProblem = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Missing request body.',
        })
    }

    const problem = new Problem(body);
    if (!problem) {
        return res.status(400).json({ success: false, error: err })
    }

    problem.ownerEmail = req.userEmail;
    problem.solutions = [];
    console.log("creating problem: " + JSON.stringify(problem));
    
    problem
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                problem: problem,
                message: 'New Problem Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'New Problem Not Created!'
            })
        })
}

module.exports = {
    createProblem
}
