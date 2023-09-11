const Problem = require('../models/problem-model');
const Solution = require('../models/solution-model');
const User = require('../models/user-model');
const fs = require('fs'); 
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");
const browserObject = require('../browser');

// This is where we'll put the code to get around the tests.
const preparePageForTests = async (page) => {
    // Pass the User-Agent Test.
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
}

createProblem = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Missing request body.',
        })
    }

    const browserInstance = await browserObject.startBrowser();
    const page = await browserInstance.newPage();
    await preparePageForTests(page);
	
	// On this new page:
	// - open the url
	// - wait until the dom content is loaded (HTML is ready)
	await page.goto(req.body.url, {
		waitUntil: "domcontentloaded",
	});
	
    await page.waitForSelector(".flex.h-full.w-full.flex-1.flex-col");

	// Get page data
	const quotes = await page.evaluate(() => {
        let body = document.querySelector(".flex.h-full.w-full.flex-1.flex-col");
        let header = body.querySelector(".mr-2").innerText.split(".");
        let number = header[0].trim();
        let name = header[1].trim();
        let difficulty = body.querySelector(".font-medium.capitalize").innerHTML;
        let description = body.querySelector(".xFUwe").innerText;
        let html = body.querySelector(".xFUwe").innerHTML;
		return {number, name, difficulty, description, html};
	});

    const difficulty = {'Easy': 1, 'Medium': 2, 'Hard': 3};

    body.number = quotes.number;
    body.name = quotes.name;
    body.difficulty = difficulty[quotes.difficulty];
    body.description = quotes.description;
    body.html = quotes.html;

    const problem = new Problem(body);
    if (!problem) {
        return res.status(400).json({ success: false, error: "Could not create new problem." })
    }

    problem.ownerEmail = req.userEmail;
    problem.solutions = [];
    problem.test = "# DO NOT DELETE THIS LINE\nfrom solution import Solution\n\ndef test1():\n";
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

updateSolution = async (req, res) => {
    const solution = await Solution.findOne({ _id: req.params.id});
    if(!solution || solution.ownerEmail !== req.userEmail) {
        return res.status(400).json({
            success: false,
            error: 'Specified solution does not exist.'
        })
    }

    solution.code = req.body.code;
    solution
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                solution: solution,
                message: 'Solution updated!'
                
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Solution not updated!'
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
    getOutput,
    updateSolution
}

