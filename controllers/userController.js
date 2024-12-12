
import User from "../models/userModel.js";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "employee" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error: ", error: err.message });
  }
};

export const findUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error: ", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error: ", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    // Find and delete the user
    const user = await User.findOneAndDelete({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    res.status(200).json({
      message: "User and associated tasks deleted successfully",
    });
  } catch (err) {
    // Rollback the transaction if something fails

    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
