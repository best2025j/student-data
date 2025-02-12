import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);
  const hasDownloaded = sessionStorage.getItem(`downloaded_${id}`); // ✅ Prevent multiple downloads

  useEffect(() => {
    const fetchStudentResult = async () => {
      try {
        const response = await axios.post(
          "https://test.omniswift.com.ng/api/viewResult/2",
          { student_id: id }
        );

        if (response.data && response.data.data) {
          setStudentData(response.data.data);
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

  // ✅ Automatically trigger PDF download after component renders
  useEffect(() => {
    if (studentData && location.state?.autoDownload && !hasDownloaded) {
      sessionStorage.setItem(`downloaded_${id}`, "true"); // ✅ Mark download as completed

      // ✅ Ensure the page is fully rendered before capturing
      requestAnimationFrame(() => {
        setTimeout(() => {
          handleDownloadPDF();
        }, 1000);
      });
    }
  }, [studentData, location.state]);

  //
  const handleDownloadPDF = async () => {
    if (!resultRef.current) {
      console.error("Error: resultRef is null");
      return;
    }

    try {
      const canvas = await html2canvas(resultRef.current, {
        scale: 4,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);
      pdf.save(`Student_Result_${studentData.surname}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }

    //
    html2canvas(document.body).then(function (canvas) {
      document.body.appendChild(canvas);
    });
  };

  if (loading)
    return (
      <p className="flex flex-col justify-center items-center h-screen w-full text-blue-500">
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
        Loading student result...
      </p>
    );

  if (error)
    return (
      <p className="flex flex-col justify-center items-center h-screen w-full text-blue-500">
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
        {error}
      </p>
    );

  if (!studentData)
    return (
      <p className="flex flex-col justify-center items-center h-screen w-full text-blue-500">
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
        No data available
      </p>
    );

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
    <div ref={resultRef} className="space-y-4 w-full h-full px-4">
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
        <div className="overflow-y-auto w-full">
          <table className="table-fixed w-full border-collapse bg-white">
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
                  className="text-sm bg-[#F2F2F2] even:bg-white h-14 text-left text-black"
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

      <div className="bottom-10 space-y-4 absolute">
        <input type="text" className="outline-none border-b" />
        <h1 className="text-black-10 text-sm">Registrar</h1>
      </div>
    </div>
  );
}
