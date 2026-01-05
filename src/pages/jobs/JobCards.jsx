import { useState } from "react";
import useJwt from "../../../src/endpoints/jwt/useJwt";
import Modal from "./Model";
export default function JobCards({
  searchText,
  location,
  jobType,
  salaryRange,
  jobsData,
}) {
  // const jobs = [
  //   {
  //     company: "Elite Models",
  //     title: "Runway Model",
  //     experience: "0 – 3 Years",
  //     level: "Mid Level",
  //     logo: "https://cdn-icons-png.flaticon.com/512/3663/3663782.png",
  //   },
  //   {
  //     company: "Bollywood Casting",
  //     title: "Film Actor",
  //     experience: "0 – 5 Years",
  //     level: "Senior Level",
  //     logo: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
  //   },
  //   {
  //     company: "Fashion Studio",
  //     title: "Fashion Model",
  //     experience: "0 – 2 Years",
  //     level: "Entry Level",
  //     logo: "https://cdn-icons-png.flaticon.com/512/2413/2413178.png",
  //   },
  //   {
  //     company: "Ad Agency",
  //     title: "TV Commercial Actor",
  //     experience: "Min 1 Year",
  //     level: "Mid Level",
  //     logo: "https://cdn-icons-png.flaticon.com/512/3531/3531833.png",
  //   },
  //   {
  //     company: "OTT Media",
  //     title: "Web Series Actor",
  //     experience: "0 – 4 Years",
  //     level: "Mid Level",
  //     logo: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
  //   },
  //   {
  //     company: "Print Production House",
  //     title: "Magazine Model",
  //     experience: "0 – 3 Years",
  //     level: "Entry Level",
  //     logo: "https://cdn-icons-png.flaticon.com/512/3218/3218543.png",
  //   },
  //   {
  //     company: "Music Video Studio",
  //     title: "Music Video Actor",
  //     experience: "0 – 1 Year",
  //     level: "Junior Level",
  //     logo: "https://cdn-icons-png.flaticon.com/512/1995/1995390.png",
  //   },
  //   {
  //     company: "Reality Show Team",
  //     title: "Reality Show Performer",
  //     experience: "Min 1 Year",
  //     level: "Mid Level",
  //     logo: "https://cdn-icons-png.flaticon.com/512/2430/2430286.png",
  //   },
  // ];
  const [open, setOpen] = useState(false);
  const [projectData, setJobDetails] = useState(null);
  // const projectData = {
  //   agency_id: 2,
  //   created_by: 2,
  //   date_from: "2025-12-22T18:26:48.054000",
  //   date_to: "2026-12-22T18:26:48.054000",
  //   deadline: "2025-12-22T18:26:48.054000",
  //   description: "fighting movie",
  //   expires_at: "2025-12-22T18:26:48.054000",
  //   gender: "male",
  //   is_paid: true,
  //   location: "nashik",
  //   pay_max: 2000,
  //   pay_min: 1000,
  //   pay_type: "cash",
  //   project_type: "series",
  //   status: "open",
  //   title: "iqbal-the-dhamdar",
  //   uuid: "e03cfa04-7441-446d-a958-77350dc6e1a0",
  //   visibility: "public",
  // };
  const handleDetailsOpen = async (uid) => {
    console.log("Job UID:", uid);
    setOpen(true);

    try {
      setJobDetails(null); // Clear previous data
      const res = await useJwt.jobDetailsById(uid);
      console.log(res?.data);
      setJobDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = jobsData.filter((job) => {
    const matchSearch =
      searchText === "" ||
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase());

    const matchJobType =
      jobType === "" || job.level.toLowerCase().includes(jobType.toLowerCase());

    return matchSearch && matchJobType;
  });

  return (
    <div className="grid grid-cols-4 gap-6 m-6">
      {filtered.map((job, index) => (
        <div
          onClick={() => handleDetailsOpen(job?.uuid)}
          key={index}
          className="
            rounded-3xl p-6 cursor-pointer duration-200 hover:shadow-xl 
            bg-gradient-to-r from-white via-primary/10 to-white shadow-md"
        >
          {/* {job.logo ? */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
            className="w-12 h-12 mb-3 mx-auto"
          />
          {/* : null} */}
          <h2 className="font-bold text-gray-900 text-lg text-center whitespace-nowrap">
            {job.title}
          </h2>
          <p className="text-gray-500 text-sm mt-1 mb-4 text-center leading-relaxed">
            {job.description}
          </p>
          <div className="flex justify-between text-gray-500 text-sm">
            <span className="whitespace-nowrap">
              {job.agency?.company_name}
            </span>
            <span className="whitespace-nowrap">{job.experience}</span>
          </div>
          <p className="text-primary mt-3 font-semibold text-sm whitespace-nowrap">
            {job.level}
          </p>
        </div>
      ))}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Model Details"
        // className="mt-20"
      >
        {/* DETAILS */}
        <div className="space-y-2 mb-2">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {projectData?.title}
            </h3>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                {projectData?.status.toUpperCase()}
              </span>
              {projectData?.is_paid && (
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                  Paid
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs">Location</p>
              <p className="font-medium capitalize">{projectData?.location}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Gender</p>
              <p className="font-medium capitalize">{projectData?.gender}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Project Type</p>
              <p className="font-medium capitalize">
                {projectData?.project_type}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Visibility</p>
              <p className="font-medium capitalize">
                {projectData?.visibility}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500">Payment</p>
            <p className="text-lg font-semibold">
              ₹{projectData?.pay_min} – ₹{projectData?.pay_max} (
              {projectData?.pay_type})
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs">Start</p>
              <p>{new Date(projectData?.date_from).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">End</p>
              <p>{new Date(projectData?.date_to).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Deadline</p>
              <p>{new Date(projectData?.deadline).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Description
            </p>
            <p className="text-gray-600">{projectData?.description}</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 border-t pt-4">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          {/* <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Confirm
          </button> */}
        </div>
      </Modal>
    </div>
  );
}
