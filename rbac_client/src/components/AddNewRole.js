import React, { useState } from "react";
import axios from "axios";

const RoleForm = ({ onRoleAdded, onClose }) => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/roles", {
        name,
        permissions,
      });
      onRoleAdded(response.data.role);
      setName("");
      setPermissions({ read: false, write: false, delete: false });
      onClose();
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const togglePermission = (perm) =>
    setPermissions((prev) => ({ ...prev, [perm]: !prev[perm] }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-900 p-5 lg:flex gap-10 rounded-md shadow-md"
      >
        <div>
          <label className="block text-sm text-white">Role Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-600 text-white rounded-md"
            placeholder="Enter role name"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white">Permissions</label>
          <div className="flex space-x-4">
            {["read", "write", "delete"].map((perm) => (
              <label key={perm} className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  checked={permissions[perm]}
                  onChange={() => togglePermission(perm)}
                  className="accent-cyan-400"
                />
                <span>{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            className="bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700"
          >
            Add Role
          </button>
          <button
            type="button"
            className="text-gray-300 hover:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
