import { userModel} from '../database/models/userModel';

// User Services
class UserSevice{
async createUser (userData)  {
  try {
    const user = await userModel.create(userData);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async getUserById (userId) {
  try {
    const user = await userModel.findById(userId);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
async getUserByEmailAndId (email, userId) {
  try {
    const user = await userModel.findOne({ email, _id: { $ne: userId } });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async getUsersByRole (role) {
  try {
    const user = await userModel.find({ role }, { password: 0 });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
async findOneAndUpdate (userId, userData) {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
}
async updateUserById (userId, userData) {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

async deleteUserById (userId) {
  try {
    const deletedUser = await userModel.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

}

export default new UserSevice();