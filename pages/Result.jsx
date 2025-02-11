import { useLocation, useNavigate } from "react-router-dom";
export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};

  return (
    <>
      <div className="space-y-4 w-full h-full px-4">
        <div className="flex justify-between items-center w-full h-full">
          <div>
            <img className="w-full h-full" src="./Logo.png" alt="" />
          </div>
          <div className="flex flex-col items-center text-center  gap-4">
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
            <img className="w-full h-full" src="./Passport.png" alt="" />
          </div>
        </div>

        {/*form  */}
        {Object.keys(formData).length === 0 ? (
          <p className="text-red-500">No data submitted.</p>
        ) : (
          <div className="flex justify-between w-full">
            <div className="flex-col flex text-xs">
              <div className="w-[200px] flex gap-4">
                <span className="text-xs font-bold">Name:</span>{" "}
                <h1 className="">Chukwuma James Nnamdi</h1>
              </div>
              <p className="flex gap-4">
                <span className="text-xs font-bold">Level:</span>
                100 level
              </p>
            </div>

            <div className="flex-col flex text-xs">
              <div className="w-[200px] flex gap-2">
                <span className="text-xs font-bold">Reg. No.:</span>
                <h1 className="">Chukwuma James Nnamdi</h1>
              </div>
              <p className="flex gap-4">
                <span className="text-xs font-bold">Session:</span>
                <h1 className=""> 2022/2023 Session</h1>
              </p>
            </div>
          </div>
        )}

        {/* table */}
        <div className="w-full bg-white">
          <div className="overflow-y-auto full ">
            <table className="table-fixed w-full border-collapse">
              <thead>
                <tr className="bg-[#0D7590] text-white text-sm font-bold h-14">
                  <th className="">S/N</th>
                  <th className="">Course Code</th>
                  <th className="">Course Title</th>
                  <th className="">Unit</th>
                  <th className="">Grade</th>
                  <th className="">Total Point</th>
                </tr>
              </thead>

              <tbody className="">
                <tr className=" text-sm bg-[#F2F2F2] h-14 text-center text-black-10">
                  <td className="">01</td>
                  <td className="">PDE 701</td>
                  <td className="">History of Education</td>
                  <td className="">2</td>
                  <td className="">A</td>
                  <td className="">8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* table */}
        <div className="w-[438px] bg-white mt-6">
          <div className="overflow-y-auto full ">
            <table className="table-fixed w-full border-collapse">
              <thead>
                <tr className="bg-[#0D7590] text-white text-sm font-bold h-14">
                  <th className="">UNTS</th>
                  <th className="">UNTD</th>
                  <th className="">GPTS</th>
                  <th className="">GPTD</th>
                  <th className="">GPATS</th>
                  <th className="">GPATD</th>
                </tr>
              </thead>

              <tbody className="">
                <tr className=" text-sm bg-[#F2F2F2] h-14 text-center text-black-10">
                  <td className="">028</td>
                  <td className=""> 701</td>
                  <td className="">028</td>
                  <td className="">028</td>
                  <td className="">028</td>
                  <td className="">028</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="py-4 text-xs font-medium">
          Remarks: <span className="text-green-10">Pass</span>
        </div>
        <div className="space-y-3">
          <input type="text" className="border-b outline-none" name="" id="" />
          <h1 className="font-medium text-xs">Registrar</h1>
        </div>
      </div>
    </>
  );
}
