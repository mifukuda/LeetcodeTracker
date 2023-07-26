const Problem = require('../models/problem-model');
const Solution = require('../models/solution-model');
const User = require('../models/user-model');
const fs = require('fs'); 
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");

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
    problem.test = "# DO NOT DELETE THIS LINE\nfrom solution import Solution\n";
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

    const problem = await Problem.findOne({ _id: req.body.problemId});
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
                    problem: problem,
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

createTest = async (req, res) => {
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

    problem.test = req.body.test;

    problem
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                problem: problem,
                message: 'New Test Added!'   
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'New Test Added!'
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

getOutput = async (req, res) => {
    // Need unique ID of user for filename
    const user = await User.findOne({ email: req.userEmail });
    if(!user) {
        return res.status(400).json({
            success: false,
            error: 'Incorrect user.'
        })
    }

    const problem = await Problem.findOne({ _id: req.query.problemId});
    if(!problem || problem.ownerEmail !== req.userEmail) {
        return res.status(400).json({
            success: false,
            error: 'Specified problem does not exist.'
        })
    }

    const solution = await Solution.findOne({ _id: req.query.solutionId});
    if(!solution || !solution.problemId.equals(problem._id)) {
        return res.status(400).json({
            success: false,
            error: 'Specified solution does not exist.'
        })
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(`${user._id}`)){
        fs.mkdirSync(`${user._id}`);
    }

    const solutionFile = `./${user.id}/solution.py`
    const test = problem.test;
    const testFile = `./${user.id}/test.py`

    // Create solution file and test file
    fs.writeFile(solutionFile, solution.code, function (err) {
        if (err) throw err;
        console.log('Solution file successfully created!');
    }); 

    fs.writeFile(testFile, test, function (err) {
        if (err) throw err;
        console.log('Test file successfully created!');
    }); 

    const command = `pytest ${testFile}`
    exec(command, (error, stdout, stderr) => {
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return res.status(200).json({ success: true, output: stderr});
        }
        if(stdout) {
            console.log(`stdout: ${stdout}`);
            return res.status(200).json({ success: true, output: stdout });
        }
        if (error) {
            console.log(`error: ${error.message}`);
            return res.status(400).json({
                success: false,
                error: 'Command failed.'
            })
        }
    });

}

module.exports = {
    createProblem,
    getProblems,
    getProblemById,
    createSolution,
    createTest,
    getOutput
}

