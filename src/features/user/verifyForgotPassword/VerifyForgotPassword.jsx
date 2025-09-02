import { CodeInput, FormField, PopupModal } from "../components"
import PasswordInput from "./PasswordInput"
import { useVerifyForgotPassword } from "./useVerifyForgotPassword"
import "./style.css"
export default function VerifyForgotPassword(){
    const {popupRef, popupContent,errorMessage,code,setCode,password,handleChangePassword, handleSubmit} = useVerifyForgotPassword()
    
    return(
   <div>
    <PopupModal {...popupContent} ref={popupRef}/>
     <div id="reset_form">
         <h1>Reset Password</h1>
         <p>We sent verify code to your email!</p>
         <p>Fill the code below and enter your new password</p>
         <CodeInput code={code} setCode={setCode} />
         <FormField message={errorMessage}><PasswordInput name="password" value={password} changeFunc={handleChangePassword}/></FormField>
         <button className="btnStyle1" disabled={code.join('') < 6} onClick={handleSubmit}><strong>Reset Password</strong></button>
     </div>
   </div>
    )
}