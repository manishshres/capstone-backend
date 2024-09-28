import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    latitude: "",
    longitude: "",
    phone_number: "",
    email: "",
    website: "",
    description: "",
    services: "",
    hours_of_operation: "",
    capacity: "",
    restrictions: "",
    requirements: "",
    external_id: "",
    status: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shelters, setShelters] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveShelters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/organizations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShelters(response.data);
    } catch (error) {
      setError("An error occurred while fetching shelters. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveShelters();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-center text-black mb-6">
        Organization Profile
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form fields */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Organization Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <select
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="shelter">Shelter</option>
              <option value="food_bank">Food Bank</option>
              <option value="health_clinic">Health Clinic</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              name="address"
              type="text"
              placeholder="1234 Main St"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          {/* Add other fields as needed... */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="latitude"
            >
              Latitude
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="latitude"
              name="latitude"
              type="text" // or "number"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="longitude"
            >
              Longitude
            </label>
            <input
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="longitude"
              name="longitude"
              type="text" // or "number"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </div>
          {/* ... other fields */}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-glaucous hover:bg-glaucous/90 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Profile;
