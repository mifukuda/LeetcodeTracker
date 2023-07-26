/* 
    From CSE 316 Top 5 Lister Project.
*/

/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/

const auth = require('../auth');
const express = require('express');
const UserController = require('../controllers/user-controller');
const ProblemController = require('../controllers/problem-controller');
const router = express.Router();

router.post('/problem', auth.verify, ProblemController.createProblem);
router.post('/solution', auth.verify, ProblemController.createSolution);
router.post('/test', auth.verify, ProblemController.createTest);
// router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
// router.delete('/top5list/:id', auth.verify, Top5ListController.deleteTop5List)
router.get('/problem/:id', auth.verify, ProblemController.getProblemById);
router.get('/problems', auth.verify, ProblemController.getProblems);
// router.get('/top5listpairs', auth.verify, Top5ListController.getTop5ListPairs)
// router.get('/top5listcurrent', auth.verify, Top5ListController.getCurrentLists)
// router.get('/top5listuser/:id', Top5ListController.getUserLists)
// router.get('/top5listcommunity/:id', Top5ListController.getCommunityListByName)
// router.get('/top5listcommunity', Top5ListController.getCommunityLists)
router.get('/output', ProblemController.getOutput);

router.post('/register', UserController.registerUser);
router.get('/loggedIn', UserController.getLoggedIn);
router.post('/login', UserController.logInUser);
router.get('/logout', UserController.logOutUser);

module.exports = router;