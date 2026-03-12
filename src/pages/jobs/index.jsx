// index.jsx
import { useEffect, useState } from "react";
import useJwt from "../../../src/endpoints/jwt/useJwt";
import JobCards from "./JobCards";
import AppliedJobCards from "./AppliedJobListing";
import SearchBar from "./SearchBar";

function Index() {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState({ min: "", max: "" });
  const [jobsData, setJobsData] = useState([]);
  const [isAppliedView, setIsAppliedView] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await useJwt.allJobsList();
      setJobsData(res?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await useJwt.getAppliedJobs();
      setJobsData(res?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAppliedView) {
      fetchAppliedJobs();
    } else {
      fetchJobs();
    }
  }, [isAppliedView]);

  return (
    <div className="w-full min-h-screen p-6 flex gap-6">
      <div className="flex-1 flex flex-col gap-6">
        <SearchBar
          setSearchText={setSearchText}
          setLocation={setLocation}
          setJobType={setJobType}
          setSalaryRange={setSalaryRange}
          isAppliedView={isAppliedView}
          setIsAppliedView={setIsAppliedView}
        />

        {/* 👇 Yahan toggle hoga */}
        {isAppliedView ? (
          <AppliedJobCards
            jobsData={jobsData}
            searchText={searchText}
            location={location}
            jobType={jobType}
            salaryRange={salaryRange}
          />
        ) : (
          <JobCards
            jobsData={jobsData}
            searchText={searchText}
            location={location}
            jobType={jobType}
            salaryRange={salaryRange}
          />
        )}
      </div>
    </div>
  );
}

export default Index;