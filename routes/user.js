const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const passport=require('passport')

router.get('/sign-in', userController.sign_in);
router.get('/sign-up', userController.sign_up);

router.get('/profile', passport.checkAuthentication, userController.profile);

router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate('local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);


router.get('/sign-out', userController.destroySession);

module.exports = router;