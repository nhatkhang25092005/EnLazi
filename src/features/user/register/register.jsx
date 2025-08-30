//feature components
import {
  EmailInput,
  UsernameInput,
  PopupModal,
  NavigateButton,
  GoogleAuthProvider
} from "../components";

//shared components
import {Loader} from "../../../shared/components";

//image
import errorImg from "../../../assets/error.png";

//page component
import { RegisterPassword,RegisterFormField } from "./components";

//css 
import "./register.css";


//custom hook
import useRegisterForm from "./useRegisterForm";

//constants messages
import {REGISTER_CONSTANTS} from "../../../shared/constants/messages"

export default function Register() {
  const {
    input,
    popup,
    loader,
    popupContent,
    errorLabels,
    handleChange,
    handleSubmit,
  } = useRegisterForm();

  /* prettier-ignore */
  return (
    <div id="register-page">
      <Loader ref={loader} />
      <PopupModal image={errorImg} title={REGISTER_CONSTANTS.ERROR_TITLE} content={popupContent} ref={popup} />
      <NavigateButton name={REGISTER_CONSTANTS.LOGIN_BUTTON} destination="/login" />
      <form id="register_form" onSubmit={(e) => handleSubmit(e)}>
        <h1><strong>{REGISTER_CONSTANTS.TITLE}</strong></h1>

        <RegisterFormField message={errorLabels.email}><EmailInput value={input.email} changeFunc={handleChange} /></RegisterFormField>
        <RegisterFormField message={errorLabels.username}><UsernameInput value={input.username} changeFunc={handleChange} /></RegisterFormField>
        <RegisterFormField message={errorLabels.password}><RegisterPassword name="password" value={input.password} changeFunc={handleChange} placeholder={REGISTER_CONSTANTS.PASSWORD_PLACEHOLDER} /></RegisterFormField>
        <RegisterFormField message={errorLabels.repass}><RegisterPassword name="repass" value={input.repass} changeFunc={handleChange} placeholder={REGISTER_CONSTANTS.RE_PASSWORD_PLACEHOLDER} /></RegisterFormField>
      
        <button type="submit" className="btnStyle1"><strong>{REGISTER_CONSTANTS.BUTTON_TEXT}</strong></button>

        <hr />  {/* Line break */}
      </form>
      <GoogleAuthProvider/>
    </div>
  );
}
