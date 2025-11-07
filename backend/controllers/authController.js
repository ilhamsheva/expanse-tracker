import jwt from "jsonwebtoken";
import User from "../models/User.js";
import upload from "../middleware/uploadMiddleware.js";
import path from "path";
import fs from "fs";

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const registerUser = async (req, res) => {
  const { profilePhoto, firstName, lastName, gender, email, password } =
    req.body;

  // Validation
  if (!firstName || !gender || !email || !password) {
    return res.status(400).json({ message: "Field are required" });
  }

  // Try if existing email
  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    // Create user
    const user = await User.create({
      profilePhoto,
      firstName,
      lastName,
      gender,
      email,
      password,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(500).json({
      message: "Error registering user",
      error: e.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Field are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // User exist
    return res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(500).json({
      message: "Error registering user",
      error: e.message,
    });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({
      message: "Error registering user",
      error: e.message,
    });
  }
};

export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
};

export const updateImage = async (req, res) => {
  const userId = req.user.id;
  const { profilePhoto } = req.body;

  if (!profilePhoto) {
    return null;
  }

  try {
    const currentUser = await User.findById({ userId }).select("-password");

    if (!currentUser) {
      return res.status(404).json({ message: "Current user not defined" });
    }

    // Jika tidak ada fotonya dan foto saat ini
    if (profilePhoto === null && currentUser.profilePhoto) {
      // Ekstrak file lama
      const oldPhotoUrl = currentUser.profilePhoto;
      const filename = path.basename(oldPhotoUrl);
      const filePath = path.join("/uploads", filename);

      // Hapus file fisik
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePhoto },
      {new: true},
    ).select("-password");
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Update image successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating image" });
  }
};
