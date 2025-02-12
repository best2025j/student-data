import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

const formFields = [
  { id: "age", label: "Age", type: "text" },
  { id: "state", label: "State", type: "text" },
  {
    id: "gender",
    type: "select",
    label: "Gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "level",
    type: "select",
    label: "Level",
    options: [
      { value: "100", label: "100" },
      { value: "200", label: "200" },
      { value: "300", label: "300" },
      { value: "400", label: "400" },
    ],
  },
];

export default function Home() {
  const [formData, setFormData] = useState({});
  // const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (Object.values(formData).some((value) => value.trim() === "")) {
      alert("Please fill in all fields.");
      return;
    }

  };

  return (
    <>
      <div className="w-[90%] h-full flex-col flex justify-center mx-auto items-start relative top-[30px]">
        <div className="space-y-4 w-full">
          <h1 className=" text-4xl text-black-10 font-black">
            Student Data Table
          </h1>
          <div className="w-full h-[336px] p-8 bg-white ">
            <h1 className="text-gray-10">Filter Student Table By:</h1>

            <form
              onSubmit={handleSubmit}
              className="gap-4 grid grid-cols-3 items-center py-8 w-full"
            >
              {formFields.map((field) => (
                <fieldset
                  key={field.id}
                  className="border border-gray-400 px-4 py-2 rounded-md"
                >
                  <legend className="text-sm font-semibold text-gray-700 px-2">
                    {field.label}
                  </legend>

                  {/* Conditional rendering for select & input fields */}
                  {field.type === "select" ? (
                    <select
                      id={field.id}
                      name={field.id}
                      value={formData[field.id] || ""}
                      onChange={handleChange}
                      required
                      className="w-full p-1 rounded outline-none"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id] || ""}
                      onChange={handleChange}
                      required
                      className="w-full p-1 rounded outline-none"
                    />
                  )}
                </fieldset>
              ))}

              {/* Submit Button */}
              <div className="pt-3">
                <input
                  type="submit"
                  value="Search"
                  className="rounded py-4 bg-green-500 text-white w-full hover:bg-green-600 transition"
                />
              </div>
            </form>
          </div>

          <Table />
        </div>
      </div>
    </>
  );
}
