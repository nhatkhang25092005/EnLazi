//feature components
import {
  EmailInput,
  UsernameInput,
  PopupModal,
  NavigateButton,
  GoogleAuthProvider,
  FormField
} from "../components";

//shared components
import {Loader} from "../../../shared/components";

//image
import errorImg from "../../../assets/error.png";

//page component
import  RegisterPassword  from "./components/RegisterPassword";

//css 
import "./register.css";


//custom hook
import useRegisterForm from "./useRegisterForm";

//constants
import {REGISTER_CONSTANTS} from "../../../shared/constants/messages"
import {PATH} from "../../../shared/constants/path"
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
      <NavigateButton name={REGISTER_CONSTANTS.NAVIGATE_BUTTON} destination={PATH.LOGIN} />
      <form id="register_form" onSubmit={(e) => handleSubmit(e)}>
        <h1><strong>{REGISTER_CONSTANTS.TITLE}</strong></h1>

        <FormField message={errorLabels.email}><EmailInput value={input.email} changeFunc={handleChange} /></FormField>
        <FormField message={errorLabels.username}><UsernameInput value={input.username} changeFunc={handleChange} /></FormField>
        <FormField message={errorLabels.password}><RegisterPassword name="password" value={input.password} changeFunc={handleChange} placeholder={REGISTER_CONSTANTS.PASSWORD_PLACEHOLDER} /></FormField>
        <FormField message={errorLabels.repass}><RegisterPassword name="repass" value={input.repass} changeFunc={handleChange} placeholder={REGISTER_CONSTANTS.RE_PASSWORD_PLACEHOLDER} /></FormField>
      
        <button type="submit" className="btnStyle1"><strong>{REGISTER_CONSTANTS.BUTTON_TEXT}</strong></button>

        <hr />  {/* Line break */}
      </form>
      <GoogleAuthProvider/>{/* Google Button */}
    </div>
  );
}
