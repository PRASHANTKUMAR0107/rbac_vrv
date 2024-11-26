import React, { useState, useEffect } from "react";
import axios from "axios";
import RoleForm from "../components/AddNewRole";
import UpdateRole from "../components/EditRole";
import { MdDeleteSweep} from "react-icons/md";
import Loader from "../components/Loader";
import { FaUserEdit } from "react-icons/fa";
const Roles = () => {
  const [showForm, setShowForm] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [roleToUpdate, setRoleToUpdate] = useState(null);

  const toggleForm = () => setShowForm((prev) => !prev);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/roles");
      setRoles(response.data.roles || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const addRole = (newRole) => {
    setRoles((prev) => [...prev, newRole]);
    setShowForm(false);
  };

  const deleteRole = async (roleId) => {
    try {
      await axios.delete(`http://localhost:5000/api/roles/${roleId}`);
      setRoles((prev) => prev.filter((role) => role._id !== roleId));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const updateRole = async (updatedRoleData) => {
    try {
      await axios.put(`http://localhost:5000/api/roles/${updatedRoleData._id}`, updatedRoleData);

      fetchRoles();

      setRoleToUpdate(null);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="lg:p-2 md:p-2 p-4 bg-gray-700 min-h-screen text-white flex flex-col">
      <div className="flex bg-gray-900 lg:bg-gray-700 md:bg-gray-700 w-full lg:justify-end md:justify-end justify-center mt-2 lg:mt-0 md:mt-0">
      <button
        onClick={toggleForm}
        className="bg-gray-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-900 hover:text-white"
      >
        {showForm ? "Cancel" : "Add New Role"}
      </button>
      </div>
      {showForm && (
        <div className="mt-4">
          <RoleForm onRoleAdded={addRole} onClose={() => setShowForm(false)} />
        </div>
      )}

      <div className="bg-gray-900 mt-4 p-4 rounded">
      <h2 className="text-xl font-bold mt-8">Roles</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
            <Loader/>
            </div>
      ) : roles.length ? (
        <table className="w-full mt-4 bg-gray-900 border border-gray-700">
          <thead>
            <tr>
              <th className="border text-lg bg-gray-600 border-gray-600 p-2">Role</th>
              <th className="border text-lg bg-gray-600 border-gray-600 p-2">Permissions</th>
              <th className="border text-lg bg-gray-600 border-gray-600 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role._id}>
                <td className="border border-gray-600 p-2">
                    <div className="flex justify-center">
                        {role.name}
                        </div>
                    </td>
                <td className="border border-gray-600 p-2">
                    <div className="flex justify-center">
                        {Object.entries(role.permissions)
                          .filter(([key, value]) => value)
                          .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                          .join(", ")}
                    </div>
                </td>
                <td className="border border-gray-600 p-2 space-x-2">
                    <div className="flex justify-center gap-5">
                        <button
                          onClick={() => setRoleToUpdate(role)}
                          className="bg-white text-cyan-600 font-semibold py-1 px-2 rounded"
                        >
                          <span className="flex items-center gap-1">  <FaUserEdit /></span>
                        </button>
                        <button
                          onClick={() => deleteRole(role._id)}
                          className="bg-cyan-600 py-1 px-2 rounded"
                        >
                          <span className="flex items-center gap-1 justify-between">  <MdDeleteSweep /> </span>
                        </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-cyan-400">No roles found.</p>
      )}

      {roleToUpdate && (
        <div className="mt-8">
          <h2 className="text-lg font-bold">Update Role</h2>
          <UpdateRole
            role={roleToUpdate}
            onUpdate={updateRole}
            onClose={() => setRoleToUpdate(null)}
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default Roles;
