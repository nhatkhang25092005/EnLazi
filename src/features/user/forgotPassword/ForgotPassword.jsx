import { FormField, PopupModal } from "../components";
import EmailInput from "../components/EmailInput";
import NavigateButton from "../components/NavigateButton";
import useForgotPassword from "./useForgotPassword"
import "./forgotPassword.css"
import { Loader } from "../../../shared/components";
export default function ForgotPassword() {
  const{
    popupRef,
    popupContent,
    loader,
    email,
    errorMessage,
    handleChange,
    handleSubmit
  } = useForgotPassword()
  return (
    <>
    <NavigateButton name="Login" destination="/login"/>
    <PopupModal title={popupContent.title} colorTitle={popupContent.colorTitle} content={popupContent.content} image={popupContent.image} handleButton={popupContent.handleButton} ref={popupRef}/>
    <Loader ref={loader}/>
      <form id="forgot_form">
        <h1>
          <strong>Forgot Password</strong>
        </h1>
        <p>Enter your email, we will send you your password</p>
        <FormField message={errorMessage}><EmailInput value={email} changeFunc={handleChange} /></FormField>
        <button onClick={handleSubmit} className="btnStyle1" style={{ marginTop: "20px" }}>
          <strong>Submit</strong>
        </button>
      </form>
    </>
  );
}
