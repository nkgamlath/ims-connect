const { Router } = require('express');

// Local Modules
const securityController = require("../controllers/security_controller");
const compayCtrl = require("../controllers/company_controller");
const userController = require("../controllers/user_controller");
const ideaController = require("../controllers/idea_controller");
const projectController = require("../controllers/project_controller");
const commentController = require("../controllers/comment_controller");
const rewardController = require("../controllers/reward_controller");

// Initialization
const router = Router();

// Company Structure
router.post('/company', compayCtrl.createRecord);
router.post('/company/list', compayCtrl.listAll);
router.get('/company/:id', compayCtrl.get);

// Security 
//router.get('/roles', securityController.listRoles);

//users
router.post('/user', userController.addUser);
router.post('/user/list', userController.listAll);
router.get('/user/:id', userController.get);
router.put('/user/:id', userController.updateUser);
router.post('/user/:id/deactivate', userController.deactiveUser);
router.post('/user/add_account', userController.addAccount);

//Ideas
router.post('/idea', ideaController.submitIdea);
router.get('/idea/:id', ideaController.getIdea);
router.put('/idea/:id/enable_voting', ideaController.enableVoting);
router.put('/idea/:id/reject', ideaController.rejectIdea);
router.put('/idea/:id/promote', ideaController.promoteIdea); //scope update to parent level
router.post('/idea/list', ideaController.listAll); //filter with scope
router.post('/idea/count', ideaController.countAll); //filter with scope
router.post('/idea/:id/vote', ideaController.vote);
router.get('/idea/:id/vote_count', ideaController.vote);

//Projects
router.post('/project/create_project/:idea_id', projectController.createProject); //create project
router.post('/project/list', projectController.listAll);

//Comment
router.post('/comment', commentController.addComment);
// router.get('/comment/:id', commentController.getComment);
// router.put('/comment/:id', commentController.updateComment);
// router.post('/comment/list', commentController.listComments);
// router.post('/comment/count', commentController.countComments);
// router.post('/comment/:id/reply', commentController.replyComment);

//Rewards
router.post('/reward/project/:id', rewardController.giveReward);
// router.post('/reward/project/:id/list', rewardController.listRewardsForProject);
// router.post('/reward/list', rewardController.listAllRewards);
// router.post('/reward/count', rewardController.countAllRewards);

module.exports = router;
