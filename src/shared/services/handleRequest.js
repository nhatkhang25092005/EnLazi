import userApi from "../../api/userApi";
import { DISPLAY } from "../constants/type";
import { STATUS } from "../constants/type";

//API Response Format
class ApiResponse {

  //constructor to create a response object
  constructor(status, message, data = null, displayType = null) {
    this.status = status ?? STATUS.UNKNOWN;
    this.message = message ?? "Unknown Error";
    this.data = data;
    this.displayType = displayType;
  }

  //get the message from api response if success
  static getMessageFromApi(res) {
    return res?.data?.message ?? "Can not get message response";
  }

  //get the message from api error response if error
  static getMessageError(err) {
    if (!err?.response) return "Network error or no response from server";
    return err.response.data?.message ?? "Unknown error from server";
  }

  //check if the response is success
  isOk() {
    return this.status >= 200 && this.status < 300;
  }
}

//classifier module
function classifyError(err) {
  const message = ApiResponse.getMessageError(err);
  const status = err?.response?.status ?? STATUS.BAD_REQUEST;
  const data = err?.response?.data ?? null;
  const displayType = Array.isArray(message) ? DISPLAY.INLINE : DISPLAY.POPUP;

  return { status, displayType, message, data };
}

//Login
export function handleLoginRequest(email, password) {
  return (
    userApi
      //call login api
      .login(email, password)

      // If login is successful, return a formatted response object
      /** Response format:
       * {
       *  status: status code return from the api
       *  message: Message from the api response
       *  data: Optional data returned by the API (can be null)
       * }
       */

      //debug
      // .then((res)=>{console.log(res)})
      .then((res) => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data))

      // If Login is not successful, classify the error and return a structured error response
      /**
       * step 1 : classify the error type (is it an array or a single message?)
       * step 2 : Based on the classification, return the formatted code error object
       * Error response format:
       * {
       *  status: Status code
       *  message: Error Message(s), can be a string or an array depending on classification
       *  data: Optional data from the API response
       *  displayType: Type of display based on classification
       * }
       */
      .catch((err) => {
        const { status, displayType, message, data } = classifyError(err);
        return new ApiResponse(status, message, data, displayType);
      })
  );
}

//Register
export function handleRegisterRequest(email, username, password) {
  return( 
    userApi
    //call register api
    .register(email, username, password)

     /**
     * If register is successful, return a formatted response object
     * Response format:
     * {
     *  status: status code return from the api
     *  message: Message from the api response
     *  data: Optional data returned by the API (can be null)
     * }
     */
    .then((res) => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data)) 
    
    // If register is not successful, classify the error and return a structured error response
    /**
     * step 1 : classify the error type (is it an array or a single message?)
     * step 2 : Based on the classification, return the formatted code error object
     * 
     * Error response format:
     * {
     *  status: Status code
     *  message: Error Message(s), can be a string or an array depending on classification
     *  data: Optional data from the API response
     *  displayType: Type of display based on classification
     * }
     */
    .catch((err) => {
      const { status, displayType, message, data } = classifyError(err);
      return new ApiResponse(status, message, data, displayType);
    })
  )
}

//Google
export function handleGoogleRequest(code) {
  return userApi
    .google(code)
    .then((res) => {      
      const data = res.data.data;
      sessionStorage.setItem("accessToken", data.accesstoken);
      sessionStorage.setItem("refreshToken", data.refreshtoken);
      sessionStorage.setItem("sessionId", data.sessionid);
      return new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data.data);
    })
    .catch((err) => {
      console.error("Google Error:", err);
      const {status, displayType, message, data} = classifyError(err)
      return new ApiResponse(status, message, data, displayType)
    });
}

//Verify Account
export function handleVerifyRequest(email, code) {
  if (!email) return new ApiResponse(STATUS.BAD_REQUEST, "email can not be null", null, DISPLAY.POPUP);
  return userApi
    .verify(email, code)
    .then((res) => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data))
    .catch((err) => {
      const { status, displayType, message, data } = classifyError(err);
      return new ApiResponse(status, message, data, displayType);
    });
}

//Forgot Password
export function handleForgotPasswordRequest(email) {
  if( !email) return new ApiResponse(STATUS.BAD_REQUEST, "email can not be null", null, DISPLAY.POPUP)

  return userApi
    .forgotPassword(email)

    //successful
    /**
     * successful response format:
     * {
     *  status:status of response
     *  message: message return from api
     *  data: data return from api
     *  display type: the type of display
     * }
     */
    .then((res) => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data, DISPLAY.POPUP))
    
    //error
    .catch((err) => {
      const {status, displayType, message, data} = classifyError(err)
      return new ApiResponse(status, message, data, displayType)
    });
}

//Verify Forgot Password
/**
 * Verify forgot password api call, if successful, the user password will be changed to the new password
 * else return the error response 
 * 
 * @param {string} email - user email
 * @param {string} code  - verify code
 * @param {string} newPassword - new password
 * @returns 
 */
export function handleVerifyForgotPassword(email, code, newPassword) {
  if (!email) {
    console.error("email can not be null");
    return new ApiResponse(STATUS.BAD_REQUEST ,"email can not be null",  null, DISPLAY.POPUP);
  }
  if (!code) {
    console.error("code can not be null");
    return new ApiResponse(STATUS.BAD_REQUEST ,"code can not be null",  null, DISPLAY.POPUP);
  }
  if (!newPassword) {
    console.error("newPassword can not be null");
    return new ApiResponse(STATUS.BAD_REQUEST ,"new password can not be null",  null, DISPLAY.INLINE);
  }
  return userApi
    .verifyForgotPassword(email, code, newPassword)
    .then((res) => new ApiResponse(res.status, ApiResponse.getMessageFromApi(res), res.data, DISPLAY.POPUP))
    .catch((err) => {
      const {status, displayType, message, data } = classifyError(err)
      return new ApiResponse(status, message, data, displayType)
    });
}
