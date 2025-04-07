import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserEdit, FaCamera } from "react-icons/fa";

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.username);
    }
  }, [user]);

  const handleNameChange = async () => {
    try {
      await axios.post("/api/profile", { name });
      alert("تم تحديث الاسم بنجاح");
    } catch (error) {
      console.error("Error updating name", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      await axios.post("/api/profile/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("تم تحديث الصورة بنجاح");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <img
          src={preview || "/default-avatar.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border"
        />
        <span className="ml-2">{name}</span>
      </div>
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white shadow-md p-4 rounded-md w-56">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
          <button
            onClick={handleNameChange}
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
          >
            <FaUserEdit className="inline mr-2" /> تحديث الاسم
          </button>
          <label className="mt-2 block text-center cursor-pointer">
            <FaCamera className="inline mr-2" /> تحديث الصورة
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
