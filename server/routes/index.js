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
// router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
// router.delete('/top5list/:id', auth.verify, Top5ListController.deleteTop5List)
// router.get('/top5list/:id', auth.verify, Top5ListController.getTop5ListById)
// router.get('/top5lists', Top5ListController.getTop5Lists)
// router.get('/top5listpairs', auth.verify, Top5ListController.getTop5ListPairs)
// router.get('/top5listcurrent', auth.verify, Top5ListController.getCurrentLists)
// router.get('/top5listuser/:id', Top5ListController.getUserLists)
// router.get('/top5listcommunity/:id', Top5ListController.getCommunityListByName)
// router.get('/top5listcommunity', Top5ListController.getCommunityLists)

router.post('/register', UserController.registerUser);
router.get('/loggedIn', UserController.getLoggedIn);
router.post('/login', UserController.logInUser);
router.get('/logout', UserController.logOutUser);

module.exports = router;