import React, { useState } from "react";
import axios from "axios";

const UpdateRole = ({ role, onUpdate, onClose }) => {
  const [name, setName] = useState(role.name);
  const [permissions, setPermissions] = useState(role.permissions);
  const [originalRole, setOriginalRole] = useState(role); 
  const [isLoading, setIsLoading] = useState(false);
  const togglePermission = (perm) =>
    setPermissions((prev) => ({ ...prev, [perm]: !prev[perm] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    onUpdate({ ...role, name, permissions });

    try {
      const response = await axios.put(`http://localhost:5000/api/roles/${role._id}`, {
        name,
        permissions,
      });

      if (response.status === 200) {
        onUpdate(response.data); 
        onClose();  
      }
    } catch (error) {
      console.error("Error updating role:", error);
      onUpdate(originalRole);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
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
                checked={permissions[perm] || false} 
                onChange={() => togglePermission(perm)}
                className="accent-cyan-400"
              />
              <span>{perm.charAt(0).toUpperCase() + perm.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4">
        <button
          type="submit"
          className={`bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Role"}
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

export default UpdateRole;