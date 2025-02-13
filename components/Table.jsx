import { useNavigate } from "react-router-dom";
import axios from "axios";

const Table = ({ students, loading, error }) => {
  const navigate = useNavigate(); // ✅ Ensure this is declared

  const handleRowClick = (student) => {
    navigate(`/result/${student.id}`); // Just view the result
  };

  // ✅ Fetch student result and navigate to Result.jsx
  const handleFetchResult = async (e, studentId) => {
    e.stopPropagation(); // ✅ Prevent row click

    try {
      const response = await axios.post(
        "https://test.omniswift.com.ng/api/viewResult/2",
        {
          student_id: studentId,
        }
      );

      if (!response.data || !response.data.data) {
        console.error("Invalid response data", response);
        return;
      }

      navigate(`/result/${studentId}`, {
        state: { studentData: response.data.data },
      });
    } catch (error) {
      console.error("Error fetching student result:", error);
    }
  };

  return (
    <div className="w-full px-8 py-3 bg-white">
      {loading ? (
        <p className="text-center flex flex-col justify-center items-center h-[450px] w-full text-blue-500">
          <svg
            className="animate-spin h-8 w-8 text-blue-500 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          Loading...
        </p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : students.length > 0 ? (
        <div className="overflow-y-auto w-full h-[450px]">
          <table className="table-fixed w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-black text-left text-sm font-bold h-14">
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
                  key={student.id || index}
                  onClick={() => handleRowClick(student)} // This will just view
                  className="border-b text-sm border-gray-300 h-14 text-left text-black-10 capitalize cursor-copy"
                >
                  <td className="text-center">{index + 1}</td>
                  <td>{student.surname || "N/A"}</td>
                  <td>{student.firstname || "N/A"}</td>
                  <td>{student.age || "N/A"}</td>
                  <td>{student.gender || "N/A"}</td>
                  <td>{student.level || "N/A"}</td>
                  <td>{student.state || "N/A"}</td>
                  <td className="text-center">
                    <button
                      onClick={(e) => handleFetchResult(e, student.id)} // This will trigger download
                      className="bg-green-500 hover:bg-green-600 cursor-pointer transition-all font-normal w-[126px] h-[35px] text-xs text-white rounded"
                    >
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
};

export default Table;
