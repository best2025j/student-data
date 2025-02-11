import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Result() {
  const { id } = useParams(); // ✅ Get student ID from URL
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentResult = async () => {
      try {
        const response = await axios.post(
          "https://test.omniswift.com.ng/api/viewResult", // ✅ No ID in URL
          { student_id: id } // ✅ Send ID in request body
        );

        console.log("Student Result API Response:", response.data);

        if (response.data && response.data.data) {
          setStudentData(response.data); // ✅ Store response data
        } else {
          throw new Error("Invalid response data");
        }
      } catch (err) {
        console.error("Error fetching student result:", err);
        setError("Failed to fetch student result. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentResult();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-blue-500">Loading student result...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!studentData)
    return <p className="text-center text-gray-500">No data available</p>;

  // ✅ Extracting student details
  const { data, logo, profile_picture } = studentData;

  return (
    <div className="space-y-4 w-full h-full px-4">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full">
        <div>
          <img className="w-24 h-24" src={logo} alt="School Logo" />
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-lg font-bold">FREMONT COLLEGE OF EDUCATION</h1>
          <p className="text-sm max-w-[240px] text-center">
            No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja, Nigeria.
          </p>
          <h2 className="text-xl font-semibold">
            Post Graduate Diploma in Education
          </h2>
          <p className="text-xs font-bold">
            Student First Semester Statement Of Result
          </p>
        </div>
        <div>
          <img
            className="w-24 h-24 rounded-full"
            src={profile_picture}
            alt="Student Profile"
          />
        </div>
      </div>

      {/* Student Details */}
      <div className="flex justify-between w-full text-sm">
        <div className="flex-col flex">
          <p className="font-bold">
            Name:{" "}
            <span className="font-normal">
              {data.surname} {data.firstname}
            </span>
          </p>
          <p className="font-bold">
            Level: <span className="font-normal">{data.level}</span>
          </p>
        </div>
        <div className="flex-col flex">
          <p className="font-bold">
            Reg. No.: <span className="font-normal">{data.reg_no}</span>
          </p>
          <p className="font-bold">
            Session: <span className="font-normal">{data.session}</span>
          </p>
        </div>
      </div>

      {/* Results Table */}
      <div className="w-full bg-white">
        <table className="table-fixed w-full border-collapse">
          <thead>
            <tr className="bg-[#0D7590] text-white text-sm font-bold h-14">
              <th>S/N</th>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Unit</th>
              <th>Grade</th>
              <th>Total Point</th>
            </tr>
          </thead>


          <tbody>
            {data.result?.map((course, index) => (
              <tr
                key={index}
                className="text-sm bg-[#F2F2F2] h-14 text-center text-black"
              >
                <td>{index + 1}</td>
                <td>{course.coursecode}</td>
                <td>{course.title}</td>
                <td>{course.credit_unit}</td>
                <td>{course.grade}</td>
                <td>{course.total_point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cumulative Results Table */}
      <div className="w-full bg-white mt-6">
        <table className="table-fixed w-full border-collapse">
          <thead>
            <tr className="bg-[#0D7590] text-white text-sm font-bold h-14">
              <th>UNTS</th>
              <th>UNTD</th>
              <th>GPTS</th>
              <th>GPTD</th>
              <th>GPATS</th>
              <th>GPATD</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-sm bg-[#F2F2F2] h-14 text-center text-black">
              <td>{data.cummulative.unts}</td>
              <td>{data.cummulative.untd}</td>
              <td>{data.cummulative.gpts}</td>
              <td>{data.cummulative.gptd}</td>
              <td>{data.cummulative.gpats}</td>
              <td>{data.cummulative.gpatd}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Remarks */}
      <div className="py-4 text-sm font-medium">
        Remarks:
        <span className="text-green-600">{data.cummulative.remarks}</span>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );
}
