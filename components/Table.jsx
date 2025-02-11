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

        setStudents(response.data); // ✅ Axios handles JSON parsing automatically
      } catch (error) {
        console.log("Error while fetching data:", error);
        setError(error.message); // ✅ Fixed error handling
      } finally {
        setLoading(false); // ✅ Stop loading after request
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-8 py-3 bg-white">
      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <div className="overflow-y-auto pt-8 h-[480px] ">
          <table className="table-fixed w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-black text-sm font-bold h-14">
                <th className="">S/N</th>
                <th className="">Surname</th>
                <th className="">First Name</th>
                <th className="">Age</th>
                <th className="">Gender</th>
                <th className="">Level</th>
                <th className="">State</th>
                <th className="">Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b text-sm border-gray-300 h-14 text-center text-black-10"
                  >
                    <td className="">{index + 1}</td>
                    <td className="">{student.Surname || "N/A"}</td>
                    <td className="">{student.Firstname || "N/A"}</td>
                    <td className="">{student.age || "N/A"}</td>
                    <td className="">{student.gender || "N/A"}</td>
                    <td className="">{student.level || "N/A"}</td>
                    <td className="">{student.state || "N/A"}</td>
                    <td className="">
                      <button className="bg-green-500 hover:bg-green-600 transition-all font-normal w-[126px] h-[35px] text-xs text-white rounded">
                        Download File
                      </button>
                    </td>
                  </tr>
                );
              })}
              ,
            </tbody>
          </table>
        </div>
      ) : (
        <p colSpan="8" className="text-center py-4 text-gray-500">
          No data available
        </p>
      )}
    </div>
  );
}
