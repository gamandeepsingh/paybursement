const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, email, password } = req.body;

    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
      return res.status(400).json({ message: "User already exist",success:false });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstname: fullname?.firstname,
      lastname: fullname?.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({ token, user,success:true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error",success:false });
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password",success:false });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid email or password",success:false });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ token, user ,success:true});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error",success:false });
  }
};

module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.clearCookie("access_token", { path: "/" });
  res.status(200).send({ message: "Logged out successfully",status:true });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const updateFields = {};

    // Check and update fullname
    if (req.body.fullname) {
      if (req.body.fullname.firstname) {
        updateFields['fullname.firstname'] = req.body.fullname.firstname;
      }
      if (req.body.fullname.lastname) {
        updateFields['fullname.lastname'] = req.body.fullname.lastname;
      }
    }

    // Check and update email
    if (req.body.email) {
      updateFields.email = req.body.email;
    }

    // Check and update bank details
    if (req.body.bankDetails) {
      updateFields.bankDetails = {
        ...user.bankDetails,
        ...req.body.bankDetails
      };
    }

    // Check and update other fields
    const fieldsToUpdate = ['businessName', 'phone', 'gstNumber'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    // Update the user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found',success:false });
    }

    res.status(200).json({
      message: 'User profile updated successfully',
      user: updatedUser,
      success:false
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error",success:false });
  }
};

