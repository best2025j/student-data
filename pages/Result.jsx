import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Result() {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentResult = async () => {
      try {
        const response = await axios.post(
          "https://test.omniswift.com.ng/api/viewResult/2",
          {
            student_id: id, // ✅ Send ID correctly in the request body
          }
        );

        console.log("Student Result API Response:", response.data);

        if (response.data && response.data.data) {
          setStudentData(response.data.data); // ✅ Store response data correctly
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

  const {
    surname,
    firstname,
    level,
    gender,
    state,
    reg_no,
    session,
    result,
    cummulative,
  } = studentData; // Destructure data

  return (
    <div className="space-y-4 w-full h-full px-4">
      <div className="flex justify-between items-center w-full h-full">
        {/* School Logo */}
        <div>
          <img
            src="/Logo.png"
            alt="School Logo"
            className="w-32 mx-auto mb-4"
          />
        </div>

        <div className="flex flex-col items-center text-center py-4  gap-4">
          <div className="w-full max-w-[275px] justify-center flex flex-col items-center">
            <h1 className="text-base font-bold">
              FREMONT COLLEGE OF EDUCATION
            </h1>
            <p className="text-xs max-w-[240px] text-center">
              No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja, Nigeria.
            </p>
          </div>
          <div className="text-xl font-semibold">
            <h1>Post Graduate Diploma in Education</h1>
            <p className="text-xs font-bold">
              Student First Semester Statement Of Result
            </p>
          </div>
        </div>

        <div>
          {/* Display Student Profile Picture */}
          <img
            src="/Passport.png"
            alt="Student Profile"
            className="w-[100px] h-[100px] mx-auto border border-gray-300 shadow-sm"
          />
        </div>
      </div>

      {/*  "id": 2,
    "surname": "bobby",
    "firstname": "Mary",
    "age": 25,
    "gender": "female",
    "level": "200 Level",
    "state": "Abuja",
    "reg_no": "FCE/PGDE/2021/002",
    "session": "2022/2023 Session", */}

      {/* Student Details */}
      <div className="flex justify-between w-full py-6">
        <div className="flex-col flex text-xs gap-4">
          <div className="w-[200px] flex gap-4">
            <span className="text-xs font-bold">Name:</span>
            <h1 className="capitalize">
              {surname} {firstname}
            </h1>
          </div>

          <div className="flex gap-4">
            <span className="text-xs font-bold">Level:</span>
            <h1 className=""> {level || "N/A"}</h1>
          </div>
        </div>

        <div className="flex-col flex text-xs gap-4">
          <div className="w-[200px] flex gap-4">
            <span className="text-xs font-bold">gender:</span>
            <h1 className="capitalize">{gender || "N/A"}</h1>
          </div>

          <div className="flex gap-4">
            <span className="text-xs font-bold">state:</span>
            <h1 className=""> {state || "N/A"}</h1>
          </div>
        </div>

        <div className="flex-col flex text-xs gap-4">
          <div className="w-[200px] flex gap-2">
            <span className="text-xs font-bold">Reg. No.:</span>
            <h1 className="">{reg_no || "N/A"}</h1>
          </div>

          <div className="flex gap-4">
            <span className="text-xs font-bold">Session:</span>
            <h1 className=""> {session || "N/A"}</h1>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="w-full bg-white">
        <div className="overflow-y-auto full ">
          <table className="table-fixed w-full border-collapse">
            <thead>
              <tr className="bg-[#0D7590] text-white text-left text-sm font-bold h-14">
                <th className="text-center">S/N</th>
                <th className="">Course Code</th>
                <th className="">Course Title</th>
                <th className="text-center">Unit</th>
                <th className="text-center">Grade</th>
                <th className="text-center">Total Point</th>
              </tr>
            </thead>

            <tbody>
              {result?.map((course, index) => (
                <tr
                  key={index}
                  className="text-sm bg-[#F2F2F2] h-14 text-left text-black"
                >
                  <td className="text-center">{index + 1}</td>
                  <td>{course.coursecode}</td>
                  <td>{course.title}</td>
                  <td className="text-center">{course.credit_unit}</td>
                  <td className="text-center">{course.grade}</td>
                  <td className="text-center">{course.total_point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cumulative Results Table */}
      <div className="w-[438px] bg-white mt-6">
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
              <td>{cummulative?.unts || "N/A"}</td>
              <td>{cummulative?.untd || "N/A"}</td>
              <td>{cummulative?.gpts || "N/A"}</td>
              <td>{cummulative?.gptd || "N/A"}</td>
              <td>{cummulative?.gpats || "N/A"}</td>
              <td>{cummulative?.gpatd || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Remarks */}
      <div className="py-4 text-sm font-medium">
        Remarks: <span className="text-green-600">{cummulative?.remarks}</span>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 text-blue-600  hover:text-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );
}
