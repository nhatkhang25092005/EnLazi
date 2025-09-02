import userApi from "../../api/userApi";
import { DISPLAY } from "../constants/type";

function classifyError(err) {
  const messages = err?.response?.data?.message;

  if (Array.isArray(messages)) {
    return { type: DISPLAY.type1, errors: messages };
  } else {
    return { type: DISPLAY.type2, error: messages };
  }
}

//Login
export function handleLoginRequest(email, password) {
  return (
    userApi
      .login(email, password)
      //login successfully
      .then(() => {
        return null;
      })
      .catch((err) => classifyError(err))
  );
}

//Register
export function handleRegisterRequest(email, username, password) {
  return userApi
    .register(email, username, password)
    .then(() => {
      return null;
    })
    .catch((err) => classifyError(err));
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
      return null;
    })
    .catch((err) => {
      console.err("Google Error:", err);
      alert("Login with google fail, Please try again");
    });
}

//Verify Account
export function handleVerifyRequest(email, code) {
  if (!email) return { type: DISPLAY.type2, error: "email is empty!" };
  return userApi
    .verify(email, code)
    .then(() => null)
    .catch((err) => ({
      type: DISPLAY.type2,
      error: err.response.data.message,
    }));
}

//Forgot Password
export function handleForgotPasswordRequest(email) {
  if (!email) return { type: DISPLAY.type2, error: "email can not be empty!" };
  return userApi
    .forgotPassword(email)
    .then(() => null)
    .catch((err) => classifyError(err));
}

//Verify Forgot Password
export function handleVerifyForgotPassword(email, code, newPassword) {
  if (!email) { 
    console.error("email can not be null");
    return {type:DISPLAY.type2,error:"email can not be null"}
  }
  if (!code) { 
    console.error("code can not be null");
    return {type:DISPLAY.type2,error:"code can not be null"}
  }
  if (!newPassword) { 
    console.error("newPassword can not be null");
    return {type:DISPLAY.type1,error:"newPassword can not be null"}
  }
  return userApi
    .verifyForgotPassword(email, code, newPassword)
    .then(() => null)
    .catch((err) => classifyError(err));
}
