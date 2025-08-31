//css
import "./login.css";

//feature components
import {
  PasswordInput,
  EmailInput,
  GoogleAuthProvider,
  NavigateButton,
  PopupModal,
  FormField
} from "../components";

//image
import errImg from "../../../assets/error.png";

//shared components
import { Loader } from "../../../shared/components";

//logic
import useLoginForm from "./useLoginForm";

//constant text
import { LOGIN_CONSTANTS } from "../../../shared/constants/messages";


export default function Login() {
  const {
    input,
    errorMessages,
    popup,
    loader,
    popupContent,
    handleInput,
    handleSubmit,
  } = useLoginForm();

  /* prettier-ignore */
  return (
    <>
      <PopupModal title={LOGIN_CONSTANTS.ERROR_TITLE} colorTitle="red" content={popupContent} image={errImg} ref={popup} />
      <Loader ref={loader} />
      <NavigateButton name={LOGIN_CONSTANTS.NAVIGATE_BUTTON} destination={"/register"} />
      <form id="login_form">
        <h2 style={{ textAlign: "center", fontSize: "3rem" }}><strong>{LOGIN_CONSTANTS.TITLE}</strong></h2>
        <FormField message={errorMessages.email}><EmailInput value={input.email} changeFunc={handleInput} /></FormField>
        <FormField message={errorMessages.password}><PasswordInput value={input.password} changeFunc={handleInput} /></FormField>
        <button onClick={(e) => handleSubmit(e)} className="btnStyle1"><strong>{LOGIN_CONSTANTS.TITLE}</strong></button>
        <hr/> 
      </form>
      <GoogleAuthProvider/>{/* Google Button */}
    </>
  );
}
