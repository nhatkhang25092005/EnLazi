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
export function handleRegisterRequest( email, username, password ) {
  return userApi
    .register(email, username, password)
    .then(() => {
      return null;
    })
    .catch((err) => classifyError(err));
}

export function handleVerifyRequest({ code }) {}
