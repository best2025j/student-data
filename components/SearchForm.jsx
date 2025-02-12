import { useState } from "react";

const SearchForm = ({ applyFilters }) => {
  const formFields = [
    { id: "age", label: "Age", type: "text" },
    { id: "state", label: "State", type: "text" },
    { id: "level", label: "Level", type: "text" },
    {
      id: "gender",
      label: "Gender",
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
  ];

  const [formData, setFormData] = useState({
    age: "",
    state: "",
    level: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filters Applied:", formData);
    applyFilters(formData); // ✅ Call applyFilters function from props
  };

  return (
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

      <div className="pt-3">
        <input
          type="submit"
          value="Search"
          className="rounded py-4 bg-green-500 text-white w-full hover:bg-green-600 transition"
        />
      </div>
    </form>
  );
};

export default SearchForm;

{
  /* search filter*/
}

{
  /* <form
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

                  Conditional rendering for select & input fields 
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

              {/* Submit Button 
              <div className="pt-3">
                <input
                  type="submit"
                  value="Search"
                  className="rounded py-4 bg-green-500 text-white w-full hover:bg-green-600 transition"
                />
              </div>
            </form> */
}
