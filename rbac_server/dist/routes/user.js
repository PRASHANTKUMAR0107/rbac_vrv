"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
var User = require("../model/User");
module.exports = function (app) {
  // Helper function for error responses
  var handleError = function handleError(res, message, error) {
    console.error(message, error);
    res.status(500).json({
      message: message,
      error: error.message
    });
  };

  // Get Users
  app.get("/api/users", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var users;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return User.find();
          case 3:
            users = _context.sent;
            // Retrieve all users
            res.status(200).json({
              count: users.length,
              users: users
            }); // Include a count of users
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            handleError(res, "Failed to fetch users", _context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  // Add User
  app.post("/api/users", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _req$body, name, email, password, role, status, existingUser, newUser, savedUser;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, role = _req$body.role, status = _req$body.status;
            if (!(!name || !email || !password || !role)) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return", res.status(400).json({
              error: "All fields are required"
            }));
          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return User.findOne({
              email: email
            });
          case 6:
            existingUser = _context2.sent;
            if (!existingUser) {
              _context2.next = 9;
              break;
            }
            return _context2.abrupt("return", res.status(400).json({
              error: "Email already exists"
            }));
          case 9:
            // Hash password
            // const hashedPassword = await bcrypt.hash(password, 10);
            // Create new user
            newUser = new User({
              name: name,
              email: email,
              password: password,
              role: role,
              status: status
            });
            _context2.next = 12;
            return newUser.save();
          case 12:
            savedUser = _context2.sent;
            res.status(201).json(savedUser); // Return the full user object
            _context2.next = 19;
            break;
          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](3);
            handleError(res, "Failed to save user", _context2.t0);
          case 19:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[3, 16]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  // Delete User
  app["delete"]("/api/users/:id", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var userId, deletedUser;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.params.id;
            if (mongoose.Types.ObjectId.isValid(userId)) {
              _context3.next = 3;
              break;
            }
            return _context3.abrupt("return", res.status(400).json({
              error: "Invalid user ID"
            }));
          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return User.findByIdAndDelete(userId);
          case 6:
            deletedUser = _context3.sent;
            if (deletedUser) {
              _context3.next = 9;
              break;
            }
            return _context3.abrupt("return", res.status(404).json({
              message: "User not found"
            }));
          case 9:
            res.status(200).json({
              message: "User deleted successfully"
            });
            _context3.next = 15;
            break;
          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](3);
            handleError(res, "Failed to delete user", _context3.t0);
          case 15:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[3, 12]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  // Update User
  app.put("/api/users/:id", /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var userId, allowedUpdates, updates, updatedUser;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.params.id;
            if (mongoose.Types.ObjectId.isValid(userId)) {
              _context4.next = 3;
              break;
            }
            return _context4.abrupt("return", res.status(400).json({
              error: "Invalid user ID"
            }));
          case 3:
            allowedUpdates = ["name", "email", "password", "role", "status"];
            updates = Object.keys(req.body).reduce(function (acc, key) {
              if (allowedUpdates.includes(key)) acc[key] = req.body[key];
              return acc;
            }, {});
            if (Object.keys(updates).length) {
              _context4.next = 7;
              break;
            }
            return _context4.abrupt("return", res.status(400).json({
              error: "No valid fields provided for update"
            }));
          case 7:
            if (!(updates.status && !["Active", "Inactive"].includes(updates.status))) {
              _context4.next = 9;
              break;
            }
            return _context4.abrupt("return", res.status(400).json({
              error: "Invalid status value"
            }));
          case 9:
            _context4.prev = 9;
            _context4.next = 12;
            return User.findByIdAndUpdate(userId, updates, {
              "new": true,
              // Return the updated user
              runValidators: true // Ensure validation on update
            });
          case 12:
            updatedUser = _context4.sent;
            if (updatedUser) {
              _context4.next = 15;
              break;
            }
            return _context4.abrupt("return", res.status(404).json({
              message: "User not found"
            }));
          case 15:
            res.status(200).json(updatedUser);
            _context4.next = 21;
            break;
          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](9);
            handleError(res, "Failed to update user", _context4.t0);
          case 21:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[9, 18]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};