const Problem = require('../models/problem-model');
const Solution = require('../models/solution-model');
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
        return res.status(400).json({ success: false, error: "Could not create new problem." })
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

createSolution = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Missing request body.',
        })
    }

    let problem = await Problem.findOne({ _id: req.body.problemId});
    if(!problem || problem.ownerEmail !== req.userEmail) {
        return res.status(400).json({
            success: false,
            error: 'Specified problem does not exist.'
        })
    }

    const solution = new Solution(body);
    if (!solution) {
        return res.status(400).json({ success: false, error: "Could not create new solution." })
    }

    solution.ownerEmail = req.userEmail;
    console.log("creating solution: " + JSON.stringify(problem));

    solution
        .save()
        .then(() => {
            problem.solutions.push(solution._id);
            problem.save().then(() => {
                return res.status(201).json({
                    success: true,
                    solution: solution,
                    message: 'New Solution Created!'
                })
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'New Solution Not Created!'
            })
        })
}

getProblems = async (req, res) => {
    try {
        let problems = await Problem.find({ ownerEmail: req.userEmail});
        if (!problems.length) {
            return res
                .status(200)
                .json({ success: true, data: [] })
        }
        return res.status(200).json({ success: true, data: problems});
    } catch (err) {
        return res.status(400).json({ success: false, error: err })
    }
}

// get problem and corresponding solutions by problem ID
getProblemById = async (req, res) => {
    try {
        console.log(req.params);
        let problem = await Problem.findOne({ _id: req.params.id });
        if (!problem) {
            return res
                .status(400)
                .json({ success: false, error: "Problem not found." })
        }
        let solutions = await Solution.find({problemId: problem._id});
        return res.status(200).json({ success: true, problem: problem, solutions: solutions });
    } catch (err) {
        return res.status(400).json({ success: false, error: err })
    }
}

module.exports = {
    createProblem,
    getProblems,
    getProblemById,
    createSolution
}
