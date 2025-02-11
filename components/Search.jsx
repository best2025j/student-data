import { useState } from "react";
import axios from "axios";

const fields = [
  { id: "age", label: "Age", type: "text" },
  { id: "state", label: "State", type: "text" },
  { id: "level", label: "Level", type: "text" },
];

export default function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    age: "",
    state: "",
    level: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure at least one field is filled
    const isEmpty = Object.values(formData).every(
      (value) => value.trim() === ""
    );
    if (isEmpty) {
      alert("Please enter at least one search criteria.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://test.omniswift.com.ng/api/filterData",
        formData
      );
      console.log("Filtered Data Response:", response.data);

      if (response.data.data && Array.isArray(response.data.data.students)) {
        onSearch(response.data.data.students); // Send filtered students to parent
      } else {
        onSearch([]); // No results found
      }
    } catch (err) {
      console.error("Error fetching filtered data:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label
              htmlFor={field.id}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        ))}

        {/* Gender Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="gender" className="text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 md:col-span-4 text-center">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
}
