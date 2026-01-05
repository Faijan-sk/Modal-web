// ** Auth Endpoints
export default {

  
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",

  tokenType: "Bearer",


  /*
  * user EendPoints 
  */
  registerEndpoint: '/auth/register',
  loginEndpoint: '/auth/login',
  updatetProfileEndpoint : '/model/user/update-profile',
  
  physicalAttributeFormEndpoint: '/model/profile',
  professionalFormEndpoint : '/model/professional',
  ProfileMediaSetEndpoint: 'model/media/upload',
  

/*
*profile endpoint 
*/
profileCompletionCheckEndpoint: '/model/user/profile/progress',
addMediaToProfileEndpoint : '/model/images',
getProfileInfoEndPoint : '/model/info',

uploadVideoToProfileEndpoint: "/model/video", 
addLinksToProfileEndpoint : '/model/social/links',


/* 
* Modal Public Section 
*/
getAllPublicModalEndpoint: '/public/models',
getPublicModalByuid : '/public/models/details/{uuid}',


/*
* casting Company 
*/
completeCastingCompanyProfileEndpoint: '/agency/create',
getJobsEndpoint : '',



// get Jobs

allJobsList:'/public/jobs',
jobDetailsById : '/agency/jobposting/',
}