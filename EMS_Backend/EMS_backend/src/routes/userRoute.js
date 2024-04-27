import express from 'express';
// eslint-disable-next-line no-unused-vars
import { isAuth} from '../middleware/auth';
import { registerUserSchema, updateUserSchema, resetPasswordInputs } from '../middleware/schema/userSchema';
import validator from '../helpers/validator';
import UserController from '../controllers/userController';

// Routes to create, read, update, delete users
const userRouter = express.Router();
userRouter.post('/register',  validator(registerUserSchema), UserController.registerUser);
userRouter.post('/signin', UserController.userSignin);
userRouter.get('/:id', UserController.getProfileByUserId);
userRouter.get('/role/:role',  UserController.getUsersByRole);
userRouter.put('/:id', isAuth, validator(updateUserSchema), UserController.updateUser);
userRouter.post("/password/reset", UserController.resetPassword);
userRouter.put("/password/new", validator(resetPasswordInputs), UserController.createNewPassword);

export default userRouter;
