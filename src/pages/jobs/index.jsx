// index.jsx
import { useEffect, useState } from "react";
import useJwt from "../../../src/endpoints/jwt/useJwt";
import JobCards from "./JobCards";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebaar";

function Index() {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState({ min: "", max: "" });
  const [jobsData, setJobsData] = useState([]);
  const fetchJobs = async () => {
    try {
    
      const res = await useJwt.allJobsList();
      // console.log("All Jobs List:", res?.data);
      setJobsData(res?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const userDataStr = localStorage.getItem("userData");

  const userData = userDataStr ? JSON.parse(userDataStr) : null;
  let userType = userData?.user?.userType;

  return (
    <div className="w-full min-h-screen p-6 flex gap-6">
      {userType === 2 && (
        <div className="w-64">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col gap-6">
        <SearchBar
          setSearchText={setSearchText}
          setLocation={setLocation}
          setJobType={setJobType}
          setSalaryRange={setSalaryRange}
        />

        <JobCards
          jobsData={jobsData}
          searchText={searchText}
          location={location}
          jobType={jobType}
          salaryRange={salaryRange}
        />
      </div>
    </div>
  );
}

export default Index;
