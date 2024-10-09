const User = require('../models/user');
const Assignment = require('../models/assignment');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const newAdmin = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'admin',
    });

    const token = signToken(newAdmin._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newAdmin,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password',
      });
    }

    const admin = await User.findOne({ email, role: 'admin' }).select('+password');

    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password',
      });
    }

    const token = signToken(admin._id);

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user.id })
      .populate('userId', 'username')
      .select('userId task createdAt status');

    res.status(200).json({
      status: 'success',
      data: {
        assignments,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, admin: req.user.id },
      { status: 'accepted' },
      { new: true, runValidators: true }
    );

    if (!assignment) {
      return res.status(404).json({
        status: 'fail',
        message: 'No assignment found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        assignment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, admin: req.user.id },
      { status: 'rejected' },
      { new: true, runValidators: true }
    );

    if (!assignment) {
      return res.status(404).json({
        status: 'fail',
        message: 'No assignment found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        assignment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
