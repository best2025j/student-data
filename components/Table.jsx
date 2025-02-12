import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Table() {
  const [students, setStudents] = useState([]); // State to store student data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const resultRef = useRef(null);

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

  const [loadingDownload, setLoadingDownload] = useState(false);
  const navigate = useNavigate();

  const handleRowClick = (student) => {
    // ✅ Pass student ID in URL + State
    navigate(`/result/${student.id}`, { state: { student } });
  };

  // for the pdf dowload
  const handleDownloadPDF = async () => {
    if (!resultRef.current) {
      console.error("Error: resultRef is null");
      return;
    }

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 2, // ✅ Higher scale for better quality
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
      pdf.save(`Student_Result_${studentData.data.surname}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }

    //
    html2canvas(document.body).then(function (canvas) {
      document.body.appendChild(canvas);
    });
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
                  key={index}
                  onClick={() => handleRowClick(student)} // ✅ Navigate when row is clicked
                  className="border-b text-sm border-gray-300 h-14 text-left text-black-10 capitalize cursor-pointer"
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
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ Prevents row click when button is clicked
                        handleDownloadPDF(student.id); // ✅ Navigate and trigger download in Result.jsx
                      }}
                      className="bg-green-500 hover:bg-green-600 transition-all font-normal w-[126px] h-[35px] text-xs text-white rounded"
                    >
                      {loadingDownload ? "Downloading..." : "Download File"}
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
