import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../components/AddUser";
import UpdateUser from "../components/EditUser";
import { MdDeleteSweep } from "react-icons/md";
import ProfileIcon from "../components/Icon";
import { FiUserPlus } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import Loader from "../components/Loader";
const Users = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [roles, setRoles] = useState([]);

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

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setShowForm(false);
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (updatedUserData, userId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        updatedUserData
      );
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? response.data : user))
      );
      setUserToUpdate(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="lg:p-2 md:p-2 p-4 bg-gray-700 rounded-2xl min-h-screen text-white flex flex-col">
      <div className="flex bg-gray-900 lg:bg-gray-700 md:bg-gray-700 w-full lg:justify-end md:justify-end justify-center mt-2 lg:mt-0 md:mt-0">
      <button
        onClick={toggleForm}
        className="bg-gray-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-900 hover:text-white"
      >
        {showForm ? "Cancel" : 
          <div className="flex items-center gap-2">
            <span>Add User</span><FiUserPlus />
          </div>}
      </button>
      </div>
      {showForm && (
        <div className="mt-4">
          <UserForm onUserAdded={addUser} roles = {roles} onClose={() => setShowForm(false)} />
        </div>
      )}
      <div className="bg-gray-900 p-4 mt-4 rounded">
      <h2 className="text-xl font-bold mt-8">Users</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
              <Loader/>
        </div>
      ) : users.length > 0 ? (
        <>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          {users.map((user) => (
            
            <div className="">
            <div
              key={user._id}
              className="bg-gray-700 p-4 rounded-md shadow-md flex justify-between"
            >
              {userToUpdate && userToUpdate._id === user._id ? (
                <UpdateUser
                  user={userToUpdate}
                  onUpdate={updateUser}
                  roles = {roles}
                  onClose={() => setUserToUpdate(null)}
                />
              ) : (
                <div className="flex gap-2">
                  <div>
                  <p>
                    <div className="flex items-center gap-2">
                      <ProfileIcon name={user.name} bgColor={`
                      ${
                        user.status === "Active" ? "bg-green-600" : "bg-red-600"
                      }`} 
                      textColor="text-white" />
                    </div>
                  </p>
                  </div>
                  <div>
                  <p>
                    <span className={`font-semibold text-black rounded-full p-0 px-2
                      ${
                        user.status === "Active" ? "bg-green-200 border border-green-500" : "bg-red-200 border border-red-500"
                      }
                    `}>
                      {user.role}
                      </span> 
                  </p>
                  <p>
                    <span className="font-bold text-xl">{user.name}</span> 
                  </p>
                  <p>
                    <span className="font-bold">Email:</span> {user.email}
                  </p>
                  <p 
                    className={`
                      ${
                        user.status === "Active" ? "text-green-200" : "text-red-200"
                      }
                    `}>
                    <span className="font-bold">{user.status}</span> 
                  </p>
                  </div>
                </div>
              )}

              {!userToUpdate || userToUpdate._id !== user._id ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-cyan-600 shadow-md text-white py-1 px-3 rounded-md hover:bg-cyan-700"
                  >
                   <span className="flex items-center gap-1 justify-between"><MdDeleteSweep /></span>
                  </button>
                  <button
                    onClick={() => setUserToUpdate(user)}
                    className="bg-white py-1 px-3 shadow-md rounded-md hover:bg-gray-400 text-cyan-600 font-semibold"
                  >
                    <span className="flex items-center gap-1 ">  <FaUserEdit /></span>
                  </button>
                </div>
                
              ) : null}
            </div>
            </div>
          ))}
        </div>


</>
      ) : (
        <p>No users found.</p>
      )}
      </div>
    </div>
  );
};
export default Users;



