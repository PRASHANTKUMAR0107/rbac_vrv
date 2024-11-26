"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var Role = require("../model/Role");
module.exports = function (app) {
  // Helper function for error responses
  var handleError = function handleError(res, message, error) {
    console.error(error);
    res.status(500).json({
      message: message,
      error: error
    });
  };

  // Get all roles
  app.get("/api/roles", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var roles;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Role.find();
          case 3:
            roles = _context.sent;
            res.status(200).json({
              roles: roles
            });
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            handleError(res, "Failed to fetch roles", _context.t0);
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

  // Get a single role by ID
  app.get("/api/roles/:id", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var id, role;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return Role.findById(id);
          case 4:
            role = _context2.sent;
            if (role) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", res.status(404).json({
              message: "Role not found"
            }));
          case 7:
            res.status(200).json(role);
            _context2.next = 13;
            break;
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);
            handleError(res, "Failed to fetch the role", _context2.t0);
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 10]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  // Create a new role
  app.post("/api/roles", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var _req$body, name, permissions, newRole;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, permissions = _req$body.permissions;
            if (!(!name || !permissions)) {
              _context3.next = 3;
              break;
            }
            return _context3.abrupt("return", res.status(400).json({
              message: "Name and permissions are required"
            }));
          case 3:
            _context3.prev = 3;
            newRole = new Role({
              name: name,
              permissions: permissions
            });
            _context3.next = 7;
            return newRole.save();
          case 7:
            res.status(201).json({
              message: "Role created successfully",
              role: newRole
            });
            _context3.next = 13;
            break;
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](3);
            handleError(res, "Failed to create role", _context3.t0);
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[3, 10]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  // Update an existing role
  app.put("/api/roles/:id", /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var id, _req$body2, name, permissions, updatedRole;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, name = _req$body2.name, permissions = _req$body2.permissions;
            if (!(!name || !permissions)) {
              _context4.next = 4;
              break;
            }
            return _context4.abrupt("return", res.status(400).json({
              message: "Name and permissions are required"
            }));
          case 4:
            _context4.prev = 4;
            _context4.next = 7;
            return Role.findByIdAndUpdate(id, {
              name: name,
              permissions: permissions
            }, {
              "new": true,
              runValidators: true
            });
          case 7:
            updatedRole = _context4.sent;
            if (updatedRole) {
              _context4.next = 10;
              break;
            }
            return _context4.abrupt("return", res.status(404).json({
              message: "Role not found"
            }));
          case 10:
            res.status(200).json({
              message: "Role updated successfully",
              role: updatedRole
            });
            _context4.next = 16;
            break;
          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](4);
            handleError(res, "Failed to update role", _context4.t0);
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[4, 13]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  // Delete a role
  app["delete"]("/api/roles/:id", /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var id, deletedRole;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return Role.findByIdAndDelete(id);
          case 4:
            deletedRole = _context5.sent;
            if (deletedRole) {
              _context5.next = 7;
              break;
            }
            return _context5.abrupt("return", res.status(404).json({
              message: "Role not found"
            }));
          case 7:
            res.status(200).json({
              message: "Role deleted successfully"
            });
            _context5.next = 13;
            break;
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](1);
            handleError(res, "Failed to delete role", _context5.t0);
          case 13:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[1, 10]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};