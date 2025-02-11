import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

export default function Home() {
  const fields = [
    { id: "age", label: "Age", type: "text" },
    { id: "state", label: "State", type: "text" },
    { id: "level", label: "Level", type: "text" },
    { id: "gender", label: "Gender", type: "text" }, // You can replace this with a dropdown if needed
  ];

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

    // Navigate to the DisplayPage with form data
    // navigate("/result", { state: { formData } });
  };

  return (
    <>
      <div className="w-[90%]  h-full flex-col flex justify-center mx-auto items-start relative top-[30px]">
        <div className="space-y-4 w-full">
          <h1 className=" text-4xl text-black-10 font-black">
            Student Data Table
          </h1>
          <div className="w-full h-[336px] p-8 bg-white ">
            <h1 className="text-gray-10">Filter Student Table By:</h1>

            <form
              onSubmit={handleSubmit}
              className="gap-4 grid grid-cols-3 items-center py-8"
            >
              {fields.map((field) => (
                <fieldset
                  key={field.id}
                  className="border border-[#ADB7BE] px-4 rounded-md"
                >
                  <legend className="text-lg font-semibold text-gray-700 px-2">
                    {field.label}
                  </legend>

                  <div className="relative py-1">
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id] || ""}
                      onChange={handleChange}
                      required
                      className="w-full mt-1 p-2 outline-none"
                    />
                    <span className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </div>
                </fieldset>
              ))}

              <div className="pt-3">
                <input
                  type="submit"
                  value="Search"
                  className="rounded py-5.5 bg-green-10 text-white w-full"
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
