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
  if (!response) {
    navigate(PATH.VERIFY, { state: { email: email } });
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
  if(response.type === DISPLAY.type2){
    setPopupContent(response.error)
    popup.current.showModal()
  }
}
