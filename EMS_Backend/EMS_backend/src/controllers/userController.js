import { sign } from '../helpers/jwt';
import { generate, check } from '../helpers/bcrypt';
import services from '../services';
import { sendEmail } from '../helpers/sendEmail';
import { verify } from '../helpers/jwt';
import { userModel } from '../database/models/userModel';

class UserController {
  static async registerUser(req, res) {
    try {
      const { email } = req.body;
      const userExist = await services.UserSevice.getUserByEmail({ email });
      if (userExist) return res.status(409).json({ message: 'User already exists' });
      if(req.body.role === 'user') {
        const userExist = await userModel.findOne({ userBusinessName: req.body.userBusinessName });
        if (userExist) return res.status(409).json({ message: 'user already exists' });
      }
      const hashedPassword = await generate(req.body.password);
      req.body.password = hashedPassword;
      const roleMap = {
        user: services.UserSevice.createuser,
      };
      const createUserFunction = roleMap[req.body.role];
      if (!createUserFunction) return res.status(400).json({ message: 'Invalid role' });
      const newUser = await createUserFunction(req.body);
      newUser.password = undefined;
      newUser._doc.token = await sign({ email: newUser.email, role: newUser.role, id: newUser._id, isAdmin: newUser.isAdmin });
      return res.status(201).json({ message: 'User created successfully', newUser });
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong', err: err.message });
    }
  }

  static async userSignin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await services.UserSevice.getUserByEmail({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (!user.accountStatus) return res.status(401).json({ message: 'Account has been deactivated' });
      const isMatch = await check(user.password, password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
      user.password = undefined;
      user._doc.token = await sign({ email: user.email, role: user.role, id: user._id, isAdmin: user.isAdmin });
      if (user.accountStatus == 'partial signup') return res.status(401).json({ message: 'Finish to signup', token: user._doc.token  });
      return res.status(200).json({ message: 'User logged in successfully', user });
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong', err: err.message });
    }
  }
  static async getProfileByUserId(req, res) {
    try {
      const userId = req.params.id;
      const user = await services.UserSevice.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.password = undefined;
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async getUsersByRole(req, res) {
    try {
      const role = req.params.role;
      const users = await services.UserSevice.getUsersByRole(role);
      if (users.length === 0) {
        return res.status(404).json({ error: 'Users not found' });
      }
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const loggedInUser = req.user.id;
      const email = req.body.email;
      const userExist = await services.UserSevice.getUserById({ _id: userId });
      if (!userExist) return res.status(404).json({ message: 'User not found' });
      if (userId !== loggedInUser) return res.status(401).json({ message: 'You can only update your profile' });
      if (email) {
        const emailExist = await services.UserSevice.getUserByEmailAndId({ email, _id: userId });
        if (emailExist) return res.status(409).json({ message: 'Email already exists' });
      }
      const updatedUser = await services.UserSevice.findOneAndUpdate(userId, req.body);
      updatedUser.password = undefined;
      return res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong', err: err.message });
    }
  }
  static async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const existUser = await services.UserSevice.getUserByEmail({ email });
      if (!existUser) return res.status(404).json({ message: 'There is no user with that email/username', err: "NOT_FOUND" });       
      const resetPasswordToken = await sign({ email: existUser.email, message: 'reset-password' });
      const resetPasswordUrl = `${process.env.BACKEND_API}/users/password/new?token=` + resetPasswordToken;
      const emailTemplate = "../helpers/emailTemplates/forgotPassword.ejs";
      const userInfo = {
        ...existUser.toObject(),
        resetPasswordToken,
        resetPasswordUrl
      };
      const sentEmail = await sendEmail(userInfo, "EMS: reset-password", emailTemplate);
      if (!sentEmail) return res.status(500).json({ message: 'Something went wrong in sending email' });
      return res.status(200).json({ message: 'User found, go and check the reset password link in your email!' });
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong', err: err.message });
    }
  }

  static async createNewPassword(req, res) {
    try {
      const { email, message } = verify(req.body.token);
      if( !message || !message.includes('reset-password') ) return res.status(500).json({ message: 'Token is not valid' });
      const existUser = await services.UserSevice.getUserByEmail({ email });
      if (!existUser) return res.status(404).json({ message: 'There is no user with that email/username', err: "NOT_FOUND" }); 
      const { password } = req.body;
      const hashedPassword = await generate(password);
      await services.UserSevice.findOneAndUpdate(existUser._id, req.body);
      const updatedPasswordAccount = await services.UserSevice.findOneAndUpdate(existUser._id, { password: hashedPassword });
      updatedPasswordAccount.password = undefined;
      if ( !updatedPasswordAccount) return res.status(500).json({ message: 'Something went wrong in resetting password' });
      return res.status(200).json({ message: 'Password was reset successfully', data : updatedPasswordAccount });
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong', err: error.message });
    }
  }

  // eslint-disable-next-line no-unused-vars
  static async deleteUser(req, res) {
  }
}

export default UserController;