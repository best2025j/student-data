import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import Table from "../components/Table";

const Home = () => {
  // ✅ State must be declared inside the component
  const [students, setStudents] = useState([]); // Store student data
  const [filteredStudents, setFilteredStudents] = useState([]); // Store filtered students
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch Data Once Component Mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://test.omniswift.com.ng/api/viewAllData"
        );
        const data = await response.json();

        console.log("API Response:", data);
        setStudents(data.data.students || []);
        setFilteredStudents(data.data.students || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Function to apply filters
  const applyFilters = (filters) => {
    let filteredData = students.filter((student) => {
      return (
        (filters.age === "" || student.age.toString() === filters.age) &&
        (filters.state === "" ||
          student.state.toLowerCase().includes(filters.state.toLowerCase())) &&
        (filters.level === "" ||
          student.level.toLowerCase().includes(filters.level.toLowerCase())) &&
        (filters.gender === "" ||
          student.gender.toLowerCase() === filters.gender.toLowerCase())
      );
    });

    setFilteredStudents(filteredData);
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

            {/* ✅ Pass applyFilters function to the SearchForm */}
            <SearchForm applyFilters={applyFilters} />
          </div>

          {/* ✅ Pass filteredStudents to Table */}
          <Table students={filteredStudents} loading={loading} error={error} />
        </div>
      </div>
    </>
  );
};

export default Home;
