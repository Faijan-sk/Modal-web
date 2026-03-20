// ** Auth Endpoints
export default {
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",

  tokenType: "Bearer",

  /*
   * user EendPoints
   */
  registerEndpoint: "/auth/register",
  loginEndpoint: "/auth/login",
  updatetProfileEndpoint: "/model/user/update-profile",
  professionalFormEndpoint: "/model/professional",
  ProfileMediaSetEndpoint: "model/media/upload",
  deleteAccountEndpoint: "/auth/delete-account",

  /*
   *profile endpoint
   */
  profileCompletionCheckEndpoint: "/model/profile/completion-status/{uuid}",
  addMediaToProfileEndpoint: "/model/images",
  getProfileInfoEndPoint: "/model/info",
  PhysicalEndpoint: "/model/profile",
  uploadVideoToProfileEndpoint: "/model/video",
  addLinksToProfileEndpoint: "/model/social/links",
  getMediaFormData: "/model/media/",
  deleteImageFromProfile: "/api/model/images?index={index}",
  deleteVideoFromProfile: "/api/model/video/?index={index}",

  /*
   * Modal Public Section
   */
  getAllPublicModalEndpoint: "/public/models",
  getPublicModalByuid: "/public/models/details/{uuid}",

  /*
   * casting Company
   */
  completeCastingCompanyProfileEndpoint: "/agency/create",
  getApplicantsEndpoint: "/job-management/my-jobs/{jobUid}/applicants",
  deleteJobForCasting: "/agency/job/{uid}",

  // get Jobs

  getAllJobsList: "/agency/job/post",
  jobDetailsById: "/agency/jobposting/",
  jobApplyEndpoint: "/applications/",
  createJobEndpoint: "agency/job/post",
  getCreatedJobs: "/job-management/my-jobs",
  getAppliedJobs: "/model/applied-jobs",
};
