import { PATH } from "../constants/path";
import { DISPLAY } from "../constants/type";

//handle login response
export function handleLoginResponse(
  response,
  { navigate, setErrorMessages, setPopupContent, popup }
) {
  if (!response) {
    navigate(PATH.DASHBOARD);
    return;
  }
  if (response.type === DISPLAY.type1) {
    setErrorMessages({
      email:
        response.errors.find((msg) => msg.toLowerCase().includes("email")) ||
        "",
      password:
        response.errors.find((msg) => msg.toLowerCase().includes("password")) ||
        "",
    });
  }

  if (response.type === DISPLAY.type2) {
    setPopupContent(response.error);
    popup.current.showModal();
  }
}

//handle register response
export function handleRegisterResponse(
  response,
  { navigate, email, setErrorMessages, setPopupContent, popup }
) {
  console.log(email);
  if (!response) {
    navigate(PATH.VERIFY, { state: email });
    return;
  }
  if (response.type === DISPLAY.type1) {
    setErrorMessages({
      email:
        response.errors.find((msg) => msg.toLowerCase().includes("email")) ||
        "",
      username:
        response.errors.find((msg) => msg.toLowerCase().includes("username")) ||
        "",
      password:
        response.errors.find((msg) => msg.toLowerCase().includes("password")) ||
        "",
    });
  }
  if (response.type === DISPLAY.type2) {
    setPopupContent(response.error);
    popup.current.showModal();
  }
}

//handle verify response
export function handleVerifyResponse(
  response,
  { setNotification, navigate, img: { successfulImg, errorImg } }
) {
  if (!response) {
    setNotification({
      title: "Verify Successful",
      colorTitle: "green",
      content: "Your account has been verified.",
      image: successfulImg,
      handleButton: () => navigate(PATH.LOGIN),
    });
  } else {
    setNotification({
      title: "Invalid",
      colorTitle: "red",
      content: response.error || "Something went wrong!",
      image: errorImg,
    });
  }
}

//handle forgot password response
export function handleForgotPasswordResponse(
  response,
  { navigate, setErrorMessage, setPopupContent,errorImage }
) {
  //success
  if (!response) {
    navigate(PATH.VERIFY_FORGOT);
    return;
  }
  if (response.type === DISPLAY.type1) {
    setErrorMessage(response.errors[0]);
  }
  if (response.type === DISPLAY.type2) {
    console.log("Hello")
    setPopupContent({
      title: "Error!" ,
      colorTitle: "red",
      content: response.error,
      image: errorImage,
      handleButton: null,
    });
  }
}
