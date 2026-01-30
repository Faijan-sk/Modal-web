// src/endpoints/jwt/jwtService.js
import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

// PRODUCTION GCP Configuration - PORT 8080 add kiya gaya hai
axios.defaults.baseURL = 'http://35.192.79.35/api/'
// axios.defaults.baseURL = 'https://locktrust.xyz/drakeapi'
// axios.defaults.baseURL = 'http://192.168.29.163:8005'


// axios.defaults.baseURL = 'http://34.71.120.171:8080/'

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }
  // ** For Refreshing Token 
  isAlreadyFetchingAccessToken = false
  // ** For Refreshing Token
  subscribers = []
  
  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        console.log('Making request to:', config.url);

        // ** Get token from localStorage
        const accessToken = this.getToken()

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          config.headers = config.headers || {}
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
          console.log('Added Authorization header');
        } else {
          console.log('No access token found');
        }

        // IMPORTANT:
        // - If request data is FormData, DO NOT set Content-Type (let axios/browser set multipart boundary)
        // - For non-FormData requests, default to application/json if not provided
        if (config.data instanceof FormData) {
          // ensure we do not force Content-Type
          if (config.headers && config.headers['Content-Type']) {
            delete config.headers['Content-Type']
          }
        } else {
          config.headers = config.headers || {}
          config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
        }

        // DO NOT set Access-Control-Allow-Origin from client side
        if (config.headers && config.headers['Access-Control-Allow-Origin']) {
          delete config.headers['Access-Control-Allow-Origin']
        }

        return config
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    )

    // ** Response Interceptor
    axios.interceptors.response.use(
      (response) => {
        console.log('Response received:', response.status);
        return response;
      },
      (error) => {
        console.error('Response error:', error.response?.status, error.response?.data);
        
        const { config, response } = error
        const originalRequest = config

        // Handle 401 Unauthorized responses (example)
        if (response && response.status === 401) {
          console.log('Unauthorized access - consider redirecting to login or refreshing token');
          // optional: handle refresh token flow here
        }

        // Handle network errors
        if (!response) {
          console.error('Network error - check if backend is running');
        }
        
        return Promise.reject(error)
      }
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    )
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  refreshToken() {
    return axios
      .post(this.jwtConfig.refreshEndpoint, {
        refreshToken: this.getRefreshToken(),
      })
      .then((response) => {
        const data = response.data
        if (data?.access_token) {
          this.setToken(data.access_token)
        }
        if (data?.refresh_token) {
          this.setRefreshToken(data.refresh_token)
        }
        return response
      })
  }

  /*
  *     User Services
  */
  signup(...args) {
    console.log('Calling register API');
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  verifyOtp(otpData, token) {
    console.log('Calling verify OTP API');
    return axios.post(`${this.jwtConfig.otpVerifyEndPoint}/${token}`, otpData);
  }

  // 🔥 LOGIN: yahi pe tokens store kar rahe hain
  login(...args) {
    console.log('Calling login API');
    
    return axios
      .post(this.jwtConfig.loginEndpoint, ...args)
      .then((response) => {
        try {
          const data = response.data
          if (data?.access_token) {
            this.setToken(data.access_token)
          }
          if (data?.refresh_token) {
            this.setRefreshToken(data.refresh_token)
          }
          console.log('Tokens saved to localStorage');
        } catch (e) {
          console.error('Error while saving tokens:', e)
        }
        return response
      })
      .catch((error) => {
        console.error('Login API error:', error);
        throw error;
      })
  }

  updateProfile(...args){
    console.log('update profile service')
    return axios.patch(this.jwtConfig.updatetProfileEndpoint , ...args)
  }

  getBasicDetail(){
    return axios.get(this.jwtConfig.updatetProfileEndpoint)
  }




  physicalAttributeSet(...args){
    return axios.post(this.jwtConfig.physicalAttributeFormEndpoint, ...args)
  }

  professionalFormSet(...args){

  return axios.post(this.jwtConfig.professionalFormEndpoint,...args)
  }
  modelMediaSet(...args){
    return axios.post(this.jwtConfig.ProfileMediaSetEndpoint, ...args)
  }


  addMediaToProfile(...args){

    return axios.post(this.jwtConfig.addMediaToProfileEndpoint, ...args)
  }

  getMediaToProfile (){
    return axios.get(this.jwtConfig.addMediaToProfileEndpoint)
  }
  getVideoForProfile(){
    return axios.get(this.jwtConfig.uploadVideoToProfileEndpoint)
  }

  getModalProfileModalInfo(){
    console.log("You are inside profile info")
    return axios.get(this.jwtConfig.getProfileInfoEndPoint)
  }

  uploadVideo(formData) {
    // Make sure the argument is FormData
    if (!(formData instanceof FormData)) {
      throw new Error("uploadVideo expects a FormData instance");
    }
    // Use axios.post so interceptors run
    return axios.post(this.jwtConfig.uploadVideoToProfileEndpoint, formData);
  }

  AddLinksToProfile(...args){

    return axios.post(this.jwtConfig.addLinksToProfileEndpoint, ...args)
  }

// src/endpoints/jwt/jwtService.js

  addLinksToProfile(links) {
    // payload exactly backend ke hisab se
    const payload = {
      links: links
    };

    console.log("Sending social links payload:", payload);

    return axios.post(this.jwtConfig.addLinksToProfileEndpoint, payload);
  }

getAllSocialMediaLinks(){
  return axios.get(this.jwtConfig.addLinksToProfileEndpoint)
}

getAllPuclicModal(){
  return axios.get(this.jwtConfig.getAllPublicModalEndpoint)
}
getPublicModalByuid(uid) {
  const url = this.jwtConfig.getPublicModalByuid.replace('{uuid}', uid);
  return axios.get(url);
}

completeCastingProfile(...args){
  return axios.post(this.jwtConfig.completeCastingCompanyProfileEndpoint,...args)
}

getProfileStatusCheck(){
  return axios.get(this.jwtConfig.profileCompletionCheckEndpoint)
}


allJobsList(){
  return axios.get(this.jwtConfig.allJobsList)
}

jobDetailsById(uuid){
  return axios.get(`${this.jwtConfig.jobDetailsById}${uuid}`)
}


getProgressStatus(uid) {
  const url = this.jwtConfig.profileCompletionCheckEndpoint.replace('{uuid}', uid);
  return axios.get(url);
}


getPhysicalAttribute(){
  return axios.get(this.jwtConfig.getPhysicalAttributeFormData)
}

getProfessionalInfo(){
  return axios.get(this.jwtConfig.getProfessionalInfoFormData)
}

getMediaFormData(){
  return axios.get(this.jwtConfig.getMediaFormData)
}

getAllSocialLinks(){

  return axios.get(this.jwtConfig.addLinksToProfileEndpoint)
}
applyjob(args){
  return axios.post(this.jwtConfig.jobApplyEndpoint, args)
}

createJob(args){
  return axios.post(this.jwtConfig.createJobEndpoint, args);
}


}
