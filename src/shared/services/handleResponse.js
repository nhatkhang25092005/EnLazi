import { PATH } from "../constants/path";
import { DISPLAY } from "../constants/type";

//handle login response
export async function handleLoginResponse(
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
