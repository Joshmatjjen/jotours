const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
/** Using Destructuring */

// const {
//   getAllUsers,
//   createUser,
//   getUser,
//   updateUser,
//   deleteUser
// } = require('./../controllers/userController');

const userRouter = express.Router();

userRouter.post('/signup', authController.signUp);
userRouter.post('/login', authController.login);

// Auth MIDDLEWARE 👇
userRouter.use(authController.protect);
// After this 👆  MIDDLEWARE  👇 Users must be authenticated. Route will be protected

userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

userRouter.patch('/updateMyPassword', authController.updatePassword);

userRouter.get('/me', userController.getMe, userController.getUser);
userRouter.patch('/updateMe', userController.updateMe);
userRouter.delete('/deleteMe', userController.deleteMe);

// RestricTo Admin Only MIDDLEWARE 👇
userRouter.use(authController.restrictTo('admin'));
// After this 👆  MIDDLEWARE  👇 Only Admin can go to route

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
