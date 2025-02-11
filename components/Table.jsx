import { useEffect, useState } from "react";
import axios from "axios";

export default function Table() {
  const [students, setStudents] = useState([]); // State to store student data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://test.omniswift.com.ng/api/viewAllData"
        );

        console.log("API Response:", response.data); // ✅ Debug API Response

        // ✅ Extract students correctly
        setStudents(response.data.data.students);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-8 py-3 bg-white">
      {loading ? (
        <p className="text-center text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : students.length > 0 ? (
        <div className="overflow-y-auto w-full h-[400px]">
          <table className="table-fixed w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-black text-left  text-sm font-bold h-14">
                <th className="text-center">S/N</th>
                <th>Surname</th>
                <th>First Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Level</th>
                <th>State</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className="border-b text-sm border-gray-300 h-14 text-left text-black-10 capitalize"
                >
                  <td className="text-center">{index + 1}</td>
                  <td>{student.surname || "N/A"}</td>
                  <td>{student.firstname || "N/A"}</td>
                  <td>{student.age || "N/A"}</td>
                  <td>{student.gender || "N/A"}</td>
                  <td>{student.level || "N/A"}</td>
                  <td>{student.state || "N/A"}</td>
                  <td className="text-center">
                    <button className="bg-green-500 hover:bg-green-600 transition-all font-normal w-[126px] h-[35px] text-xs text-white rounded">
                      Download File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-4 text-gray-500">No data available</p>
      )}
    </div>
  );
}
