import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }
    let role = "user";
    if (email === "admin@gmail.com" && password === "admin123") {
      role = "admin";
    }

    const newUser = new User({ name, email, password, role });

    await newUser.save();

    res.json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Directly compare the plaintext passwords
    if (user.password !== password)
      return res.status(400).json({ msg: "Invalid password" });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
