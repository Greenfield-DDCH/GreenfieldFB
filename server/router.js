import express from 'express';
import { Router } from 'express';
import {getPosts, postToPosts, getComments, findFriend, getStatus} from './controllers/controller';
import profileController from './controllers/profileController.js';
import searchController from './controllers/searchController';
import signupController from './controllers/signupController';
import loginController from './controllers/loginController';
import passport from './models/passport';
import verifyJWTToken from './tokenVerify';
import friendsController from './controllers/friendsController';
import friendListController from './controllers/friendListController';



const router = Router();

router.route('/search/:username')
  .get(verifyJWTToken, searchController);

router.route('/user/login')
  .post(passport.authenticate('local'), loginController);
router.route('/user/')
  .post(signupController);

router.route('/user/setstatus')
  .post( profileController.EditStatus);

router.route('/user/insertpicture')
  .post(profileController.EditPicture);

  
//COMMENTS GO THROUGH THE ROUTE BELOW WORKS FOR REGULAR POSTS FOR JWT TOKEN, BUT NOT FOR COMMENTS ON A POST
router.get('/posts/:userId', getPosts);
router.post('/posts/:userId', postToPosts);

router.get('/comments/:parentId/:userId', getComments);
router.get('/status/:userId', getStatus);

// Friend Handling
//check to see if friends
router.get('/friends/:currUserId/:loggedInAsId', findFriend);

//Add friend
router.route('/friends')
  .post(friendsController);

//grab friends for list
router.route('/friends/:userId')
  .get(friendListController);

export default router;
