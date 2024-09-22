import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [shelters, setShelters] = useState([]);
  const [search, setSearch] = useState("");
  const [serviceType, setServiceType] = useState("");

  const fetchShelters = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.get(
        `http://localhost:3000/api/shelters?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShelters(response.data);
    } catch (error) {
      console.error("Error fetching shelters:", error);
      // Handle error (e.g., redirect to login if unauthorized)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchShelters();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Enter City Name or zipcode"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="px-4 py-2 border-t border-b border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Service Type</option>
            <option value="Shelter">Shelter</option>
            <option value="Foodbank">Foodbank</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shelters.map((shelter) => (
          <div
            key={shelter.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {shelter.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{shelter.address}</p>
              <p className="mt-1 text-sm text-gray-500">
                {shelter.city}, {shelter.state} {shelter.zip_code}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {shelter.phone_number}
              </p>
              <a
                href={shelter.official_website}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Website
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            1
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            2
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            3
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Next
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
