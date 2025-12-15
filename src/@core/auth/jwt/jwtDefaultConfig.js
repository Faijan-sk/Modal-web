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
addMediaToProfileEndpoint : '/model/images/videos',
getProfileInfoEndPoint : '/model/info',
uploadVideoToProfileEndpoint: "/model/video", 
addLinksToProfileEndpoint : '/model/social/links',

  
}