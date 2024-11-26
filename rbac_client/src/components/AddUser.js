import React, { useState } from "react";
import axios from "axios";
import { RiUserAddLine } from "react-icons/ri";

const UserForm = ({ onUserAdded, roles, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [status, setStatus] = useState("Active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
        role,
        status,
      });

      onUserAdded(response.data);


      setName("");
      setEmail("");
      setPassword("");
      setRole("User");
      setStatus("Active");

      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 p-5 rounded-md w-full max-w-lg space-y-4 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="absolute top-3 right-3 text-white hover:text-gray-400"
          onClick={onClose}
        >
          ✕
        </button>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label className="block text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-600 text-white rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-gray-600 text-white rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-600 text-white rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 bg-gray-600 text-white rounded-md"
                required
              >
                <option value="User">User</option>
                {roles.map((role) => (
                  <option key={role._id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 bg-gray-600 text-white rounded-md"
                required
              >
                <option value="Active" className="hover:bg-cyan-400">
                  Active
                </option>
                <option value="Inactive" className="hover:bg-cyan-400">
                  Inactive
                </option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-800 text-white py-2 px-4 rounded-md mt-4"
          >
            <span className="flex items-center justify-between gap-2">
              Add User <RiUserAddLine />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
