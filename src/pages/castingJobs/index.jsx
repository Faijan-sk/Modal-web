import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import StaticJobCard from "./JobCards";
import ModalListing from "./ModalListing";
import useJwt from "../../endpoints/jwt/useJwt";

function Index() {
  const [jobUid, setJobUid] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);

  // Fetch applications when jobUid changes
  const fetchApplications = async (uid) => {
    try {
      setLoadingApplications(true);
      const response = await useJwt.getAppliacantsList(uid);
      setApplications(response?.data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]);
    } finally {
      setLoadingApplications(false);
    }
  };

  useEffect(() => {
    if (jobUid) {
      fetchApplications(jobUid);
    }
  }, [jobUid]);

  return (
    <>
      <SearchBar />

      {/* <ModalListing
        jobUid={jobUid}
        applications={applications}
        loading={loadingApplications}
      /> */}

      <div className="mt-10 flex justify-center items-center">
        <StaticJobCard
          setJobUid={setJobUid}
        />
      </div>
    </>
  );
}

export default Index;