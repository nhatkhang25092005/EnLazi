import { PATH } from "../constants/path";
import { DISPLAY } from "../constants/type";

/**
 * handle response from api
 * get response from api and handler object, display the response based on the handler object
 *  -res: response object from api
 *  -handler: object containing the fallback functions for each display type
 *    - onSuccess: function to handle successful response (status code 200-299)
 *    - onInline: function to handle inline display type (array of messages)
 *    - onPopup: function to handle popup display type (single message)
 * @param {Object} res
 * @param {Object of function} handler
 * @returns
 */
function handleResponse(res, handler = {}) {
  //handle success case
  if (res.isOk()) {
    if(!handler.onSuccess){
      console.error("Missing success handler in handleResponse function")
      return;
    }
    handler.onSuccess(res.message)
    return
  }

  //display handler definition
  const dispatchMap = {
    [DISPLAY.INLINE] : () => {
      const messages = Array.isArray(res.message) ? res.message : [res.message]
      handler.onInline?.(messages)
    },
    [DISPLAY.POPUP] : () => {
      handler.onPopup?.(res.message)
    } 
  }

  //select the display type handler, if not defined, log an error
  dispatchMap[res.displayType]
  ? dispatchMap[res.displayType]() // property function call
  : console.error("No handler defined for display type:",res.displayType)
}
//UI services
/**
 * UI services object containing generic display functions
 * - inlineDisplay: function to display inline messages
 * - popupDisplay: function to display popup messages
 */
const uiServices = {
  /**
   * Generic inline display service
   * 
   * @param {Function} setState - React state Function
   * @param {string[]} messageArray - Array of message to display
   * @param {string[]} props - List of field name to check
   */
  inlineDisplay : (setState, messageArray, displayProps) => {
    const newState = {}
    displayProps.forEach((field)=>{
      const foundMessage = messageArray.find((msg) => msg.toLowerCase().includes(field.toLowerCase()))
      newState[field] = foundMessage || ""
    })
    setState(newState)
  },

  /**
   * Generic popup display service
   * 
   * @param {Function} setState - React state Function
   * @param {Object} popup - Popup Modal
   * @param {Object} message - Message to display
   */
  popupDisplay : (setState, popup, content) =>{
    setState(content);
    if (popup?.current) {
      popup.current.showModal();
    } else {
      console.error("Popup modal is not ready");
    }
  }

  // form display

  // notification display
}

//Process Login Response
/**
 * Processes the response returned from handleLoginRequest
 *  - If the response status is between 200 and 299 (inclusive), redirect to the Dashboard Page
 *  - Otherwise, display the error message based on the display type of response
 * @param {object} response  - The response object from the login request
 * @param {Object} uiProps   - UI-related properties used for rendering or interaction
 * @returns - Depends on implementation; may trigger navigation or UI updates
 */

export function processLoginResponse(response, uiProps) {
  handleResponse(
    response, 
    {
      //handle success case
      onSuccess: () => uiProps.navigate(PATH.DASHBOARD),
      //handle inline display messages
      onInline: (message) =>  uiServices.inlineDisplay(uiProps.setErrorMessages, message, ['email','password']),
      //handle popup display message
      onPopup: (message) => uiServices.popupDisplay(uiProps.setPopupContent, uiProps.popup, message)
    }
  )
}

/**
 * Processes the response returned from handleRegisterRequest
 *  - If the response status is between 200 and 299 (inclusive), redirect to the Verify Page with email state
 *  - Otherwise, display the error message based on the display type of response
 * 
 * @param {Object} response - The response object from the register request
 * @param {Object} uiProps  - UI-related properties used for rendering or interaction
 * @param {string} email    - email to pass to the verify page
 */
export function processRegisterResponse( response, uiProps, email ) {
  handleResponse(
    response,
    {
      //handle success case
      onSuccess: () => uiProps.navigate(PATH.VERIFY, { state: email }),
      //handle inline display messages
      onInline: (message) => uiServices.inlineDisplay(uiProps.setErrorMessages, message, ['email','username','password']),
      //handle popup display message
      onPopup: (message) => uiServices.popupDisplay(uiProps.setPopupContent, uiProps.popup, message)
    }
  )
}

/**
 * 
 * @param {Object} response - Response object from the verify request
 * @param {Object} uiProps  - UI-related properties used for rendering or interaction
 *    - navigate: function to navigate to other pages
 *    - setNotification: function to set the notification state
 *    - popupRef: reference to the popup modal
 *    - img: object containing successImg and errorImg
 */
export function processVerifyResponse( response, uiProps ) {
  console.log(response)
  handleResponse(
    response,
   {
      //handle success case
      onSuccess : () => uiServices.popupDisplay(uiProps.setNotification, uiProps.popupRef, {
        title: "Verify Successful",
        colorTitle: "green",
        content: "Your account has been verified.",
        image: uiProps.img.successImg,
        handleButton: () => uiProps.navigate(PATH.LOGIN),
      }),

      //handle popup display message
      onPopup : (message) => uiServices.popupDisplay(uiProps.setNotification, uiProps.popupRef, {
        title: "Invalid",
        colorTitle: "red",
        content: message || "Something went wrong!",
        image: uiProps.img.errorImg,
      })
    }
  )
}

//handle forgot password response
/**
 * 
 * @param {Object} response - Response object return from forgot password response
 * @param {Object} uiProps  - UI-related Object used for rendering or interaction
 * @param {string} email    - Email to send to handle verify forgot password request
 * @returns 
 */
export function processForgotPasswordResponse( response, uiProps, email ) {
  console.log("response:", response)
  console.log("uiProps:", uiProps)
  handleResponse(
    response,
    {
      //handle success cases
      onSuccess : () => uiProps.navigate(PATH.VERIFY_FORGOT, {state:email}),
      //handle inline display case
      onInline: (message) => uiServices.inlineDisplay(uiProps.setErrorMessage,  message, ["email"]),
      //handle popup display case
      onPopup: () => uiServices.popupDisplay(uiProps.setPopupContent, uiProps.popupRef, 
        {
          title: "Error!",
          colorTitle: "red",
          content: response.message || "Something went wrong!",
          image: uiProps.errorImg,
          handleButton: null,
        }
      ),
    }
  )
}

//handle verify forgot password response
/**
 * 
 * @param {Object} response - Response object return from verify forgot password request
 * @param {Object} uiProps  - UI-related Object used for rendering or interaction
 *    - navigate: function to navigate to other pages
 *    - setErrorMessage: function to set the error message state
 */
export function processVerifyForgotPasswordResponse( response, uiProps){
  console.log("response", response)
  console.log("uiProps", uiProps)
  handleResponse(response,
    {
      //handle success case
      onSuccess: (message) => uiServices.popupDisplay(uiProps.setPopupContent, uiProps.popupRef, 
        {
        title: "Change Password Successful",
        content: message,
        colorTitle: "green",
        image: uiProps.image.successfulImg,
        handleButton: () => uiProps.navigate(PATH.LOGIN),
      }),

      //handle inline display case
      onInline : () => uiServices.inlineDisplay(uiProps.setErrorMessage, response.errors, ["password"]),
      
      //handle popup display case
      onPopup : () => uiServices.popupDisplay(uiProps.setPopupContent, uiProps.popupRef, 
        {
          title: "Error",
          content: response.message,
          image: uiProps.image.errorImg,
          colorTitle: "red",
        }
      )
    }
  )
}

//test case
export function handleTest(response, uiProps) {
  console.log(uiProps);
  console.log(response);
}
